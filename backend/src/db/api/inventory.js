const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class InventoryDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const inventory = await db.inventory.create(
      {
        id: data.id || undefined,

        product_name: data.product_name || null,
        available_quantity: data.available_quantity || null,
        reserved_quantity: data.reserved_quantity || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await inventory.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    return inventory;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const inventoryData = data.map((item, index) => ({
      id: item.id || undefined,

      product_name: item.product_name || null,
      available_quantity: item.available_quantity || null,
      reserved_quantity: item.reserved_quantity || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const inventory = await db.inventory.bulkCreate(inventoryData, {
      transaction,
    });

    // For each item created, replace relation files

    return inventory;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const inventory = await db.inventory.findByPk(id, {}, { transaction });

    await inventory.update(
      {
        product_name: data.product_name || null,
        available_quantity: data.available_quantity || null,
        reserved_quantity: data.reserved_quantity || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await inventory.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    return inventory;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const inventory = await db.inventory.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of inventory) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of inventory) {
        await record.destroy({ transaction });
      }
    });

    return inventory;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const inventory = await db.inventory.findByPk(id, options);

    await inventory.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await inventory.destroy({
      transaction,
    });

    return inventory;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const inventory = await db.inventory.findOne({ where }, { transaction });

    if (!inventory) {
      return inventory;
    }

    const output = inventory.get({ plain: true });

    output.organization = await inventory.getOrganization({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.organizations,
        as: 'organization',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.product_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'inventory',
            'product_name',
            filter.product_name,
          ),
        };
      }

      if (filter.available_quantityRange) {
        const [start, end] = filter.available_quantityRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            available_quantity: {
              ...where.available_quantity,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            available_quantity: {
              ...where.available_quantity,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.reserved_quantityRange) {
        const [start, end] = filter.reserved_quantityRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            reserved_quantity: {
              ...where.reserved_quantity,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            reserved_quantity: {
              ...where.reserved_quantity,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.organization) {
        const listItems = filter.organization.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          organizationId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    if (globalAccess) {
      delete where.organizationId;
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.inventory.count({
            where: globalAccess ? {} : where,
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.inventory.findAndCountAll({
          where: globalAccess ? {} : where,
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(
    query,
    limit,
    offset,
    globalAccess,
    organizationId,
  ) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('inventory', 'product_name', query),
        ],
      };
    }

    const records = await db.inventory.findAll({
      attributes: ['id', 'product_name'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['product_name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.product_name,
    }));
  }
};
