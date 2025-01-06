const db = require('../models');
const Users = db.users;

const HumanResources = db.human_resources;

const Inventory = db.inventory;

const Machinery = db.machinery;

const QualityControl = db.quality_control;

const RawMaterials = db.raw_materials;

const Suppliers = db.suppliers;

const WorkOrders = db.work_orders;

const Organizations = db.organizations;

const HumanResourcesData = [
  {
    employee_name: 'Archimedes',

    role: 'Dmitri Mendeleev',

    payroll: 33.64,

    // type code here for "relation_one" field
  },

  {
    employee_name: 'Gertrude Belle Elion',

    role: 'Gregor Mendel',

    payroll: 38.26,

    // type code here for "relation_one" field
  },

  {
    employee_name: 'Gustav Kirchhoff',

    role: 'Marcello Malpighi',

    payroll: 87.85,

    // type code here for "relation_one" field
  },

  {
    employee_name: 'Albert Einstein',

    role: 'Hermann von Helmholtz',

    payroll: 34.72,

    // type code here for "relation_one" field
  },
];

const InventoryData = [
  {
    product_name: 'Ernest Rutherford',

    available_quantity: 14.84,

    reserved_quantity: 30.78,

    // type code here for "relation_one" field
  },

  {
    product_name: 'Claude Bernard',

    available_quantity: 97.91,

    reserved_quantity: 93.15,

    // type code here for "relation_one" field
  },

  {
    product_name: 'Carl Gauss (Karl Friedrich Gauss)',

    available_quantity: 17.64,

    reserved_quantity: 54.59,

    // type code here for "relation_one" field
  },

  {
    product_name: 'Lucretius',

    available_quantity: 12.43,

    reserved_quantity: 66.43,

    // type code here for "relation_one" field
  },
];

const MachineryData = [
  {
    name: 'Michael Faraday',

    maintenance_schedule: 'Hans Bethe',

    last_maintenance: new Date(),

    // type code here for "relation_one" field
  },

  {
    name: 'Antoine Laurent Lavoisier',

    maintenance_schedule: 'Max von Laue',

    last_maintenance: new Date(),

    // type code here for "relation_one" field
  },

  {
    name: 'Antoine Laurent Lavoisier',

    maintenance_schedule: 'Michael Faraday',

    last_maintenance: new Date(),

    // type code here for "relation_one" field
  },

  {
    name: 'Dmitri Mendeleev',

    maintenance_schedule: 'Sheldon Glashow',

    last_maintenance: new Date(),

    // type code here for "relation_one" field
  },
];

const QualityControlData = [
  {
    check_name: 'Alfred Binet',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    compliance: false,

    // type code here for "relation_one" field
  },

  {
    check_name: 'Albert Einstein',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    compliance: true,

    // type code here for "relation_one" field
  },

  {
    check_name: 'Edward O. Wilson',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    compliance: true,

    // type code here for "relation_one" field
  },

  {
    check_name: 'Murray Gell-Mann',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    compliance: true,

    // type code here for "relation_one" field
  },
];

const RawMaterialsData = [
  {
    name: 'Edward Teller',

    quantity: 54.95,

    reorder_level: 72.82,

    // type code here for "relation_one" field
  },

  {
    name: 'Joseph J. Thomson',

    quantity: 59.85,

    reorder_level: 27.14,

    // type code here for "relation_one" field
  },

  {
    name: 'Arthur Eddington',

    quantity: 81.99,

    reorder_level: 41.67,

    // type code here for "relation_one" field
  },

  {
    name: 'Max Planck',

    quantity: 85.11,

    reorder_level: 22.12,

    // type code here for "relation_one" field
  },
];

const SuppliersData = [
  {
    supplier_name: 'Alfred Binet',

    contract_terms: 'Charles Lyell',

    delivery_schedule: new Date(),

    // type code here for "relation_one" field
  },

  {
    supplier_name: 'Edward Teller',

    contract_terms: 'James Watson',

    delivery_schedule: new Date(),

    // type code here for "relation_one" field
  },

  {
    supplier_name: 'J. Robert Oppenheimer',

    contract_terms: 'Jean Baptiste Lamarck',

    delivery_schedule: new Date(),

    // type code here for "relation_one" field
  },

  {
    supplier_name: 'Charles Sherrington',

    contract_terms: 'John Bardeen',

    delivery_schedule: new Date(),

    // type code here for "relation_one" field
  },
];

const WorkOrdersData = [
  {
    order_number: 'Alfred Binet',

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    start_date: new Date(),

    end_date: new Date(),

    // type code here for "relation_one" field
  },

  {
    order_number: 'Ernst Mayr',

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    start_date: new Date(),

    end_date: new Date(),

    // type code here for "relation_one" field
  },

  {
    order_number: 'Jean Piaget',

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    start_date: new Date(),

    end_date: new Date(),

    // type code here for "relation_one" field
  },

  {
    order_number: 'Louis Victor de Broglie',

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    start_date: new Date(),

    end_date: new Date(),

    // type code here for "relation_one" field
  },
];

const OrganizationsData = [
  {
    name: 'Archimedes',
  },

  {
    name: 'Galileo Galilei',
  },

  {
    name: 'Edward Teller',
  },

  {
    name: 'Edward O. Wilson',
  },
];

// Similar logic for "relation_many"

async function associateUserWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setOrganization) {
    await User0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setOrganization) {
    await User1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setOrganization) {
    await User2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setOrganization) {
    await User3.setOrganization(relatedOrganization3);
  }
}

async function associateHumanResourceWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const HumanResource0 = await HumanResources.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (HumanResource0?.setOrganization) {
    await HumanResource0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const HumanResource1 = await HumanResources.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (HumanResource1?.setOrganization) {
    await HumanResource1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const HumanResource2 = await HumanResources.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (HumanResource2?.setOrganization) {
    await HumanResource2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const HumanResource3 = await HumanResources.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (HumanResource3?.setOrganization) {
    await HumanResource3.setOrganization(relatedOrganization3);
  }
}

async function associateInventoryWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Inventory0 = await Inventory.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Inventory0?.setOrganization) {
    await Inventory0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Inventory1 = await Inventory.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Inventory1?.setOrganization) {
    await Inventory1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Inventory2 = await Inventory.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Inventory2?.setOrganization) {
    await Inventory2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Inventory3 = await Inventory.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Inventory3?.setOrganization) {
    await Inventory3.setOrganization(relatedOrganization3);
  }
}

async function associateMachineryWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Machinery0 = await Machinery.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Machinery0?.setOrganization) {
    await Machinery0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Machinery1 = await Machinery.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Machinery1?.setOrganization) {
    await Machinery1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Machinery2 = await Machinery.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Machinery2?.setOrganization) {
    await Machinery2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Machinery3 = await Machinery.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Machinery3?.setOrganization) {
    await Machinery3.setOrganization(relatedOrganization3);
  }
}

async function associateQualityControlWithWork_order() {
  const relatedWork_order0 = await WorkOrders.findOne({
    offset: Math.floor(Math.random() * (await WorkOrders.count())),
  });
  const QualityControl0 = await QualityControl.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (QualityControl0?.setWork_order) {
    await QualityControl0.setWork_order(relatedWork_order0);
  }

  const relatedWork_order1 = await WorkOrders.findOne({
    offset: Math.floor(Math.random() * (await WorkOrders.count())),
  });
  const QualityControl1 = await QualityControl.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (QualityControl1?.setWork_order) {
    await QualityControl1.setWork_order(relatedWork_order1);
  }

  const relatedWork_order2 = await WorkOrders.findOne({
    offset: Math.floor(Math.random() * (await WorkOrders.count())),
  });
  const QualityControl2 = await QualityControl.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (QualityControl2?.setWork_order) {
    await QualityControl2.setWork_order(relatedWork_order2);
  }

  const relatedWork_order3 = await WorkOrders.findOne({
    offset: Math.floor(Math.random() * (await WorkOrders.count())),
  });
  const QualityControl3 = await QualityControl.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (QualityControl3?.setWork_order) {
    await QualityControl3.setWork_order(relatedWork_order3);
  }
}

async function associateQualityControlWithQuality_control_officer() {
  const relatedQuality_control_officer0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const QualityControl0 = await QualityControl.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (QualityControl0?.setQuality_control_officer) {
    await QualityControl0.setQuality_control_officer(
      relatedQuality_control_officer0,
    );
  }

  const relatedQuality_control_officer1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const QualityControl1 = await QualityControl.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (QualityControl1?.setQuality_control_officer) {
    await QualityControl1.setQuality_control_officer(
      relatedQuality_control_officer1,
    );
  }

  const relatedQuality_control_officer2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const QualityControl2 = await QualityControl.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (QualityControl2?.setQuality_control_officer) {
    await QualityControl2.setQuality_control_officer(
      relatedQuality_control_officer2,
    );
  }

  const relatedQuality_control_officer3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const QualityControl3 = await QualityControl.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (QualityControl3?.setQuality_control_officer) {
    await QualityControl3.setQuality_control_officer(
      relatedQuality_control_officer3,
    );
  }
}

async function associateQualityControlWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const QualityControl0 = await QualityControl.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (QualityControl0?.setOrganization) {
    await QualityControl0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const QualityControl1 = await QualityControl.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (QualityControl1?.setOrganization) {
    await QualityControl1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const QualityControl2 = await QualityControl.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (QualityControl2?.setOrganization) {
    await QualityControl2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const QualityControl3 = await QualityControl.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (QualityControl3?.setOrganization) {
    await QualityControl3.setOrganization(relatedOrganization3);
  }
}

async function associateRawMaterialWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const RawMaterial0 = await RawMaterials.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (RawMaterial0?.setOrganization) {
    await RawMaterial0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const RawMaterial1 = await RawMaterials.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (RawMaterial1?.setOrganization) {
    await RawMaterial1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const RawMaterial2 = await RawMaterials.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (RawMaterial2?.setOrganization) {
    await RawMaterial2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const RawMaterial3 = await RawMaterials.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (RawMaterial3?.setOrganization) {
    await RawMaterial3.setOrganization(relatedOrganization3);
  }
}

async function associateSupplierWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Supplier0 = await Suppliers.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Supplier0?.setOrganization) {
    await Supplier0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Supplier1 = await Suppliers.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Supplier1?.setOrganization) {
    await Supplier1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Supplier2 = await Suppliers.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Supplier2?.setOrganization) {
    await Supplier2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Supplier3 = await Suppliers.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Supplier3?.setOrganization) {
    await Supplier3.setOrganization(relatedOrganization3);
  }
}

// Similar logic for "relation_many"

async function associateWorkOrderWithProduction_manager() {
  const relatedProduction_manager0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const WorkOrder0 = await WorkOrders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (WorkOrder0?.setProduction_manager) {
    await WorkOrder0.setProduction_manager(relatedProduction_manager0);
  }

  const relatedProduction_manager1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const WorkOrder1 = await WorkOrders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (WorkOrder1?.setProduction_manager) {
    await WorkOrder1.setProduction_manager(relatedProduction_manager1);
  }

  const relatedProduction_manager2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const WorkOrder2 = await WorkOrders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (WorkOrder2?.setProduction_manager) {
    await WorkOrder2.setProduction_manager(relatedProduction_manager2);
  }

  const relatedProduction_manager3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const WorkOrder3 = await WorkOrders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (WorkOrder3?.setProduction_manager) {
    await WorkOrder3.setProduction_manager(relatedProduction_manager3);
  }
}

async function associateWorkOrderWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const WorkOrder0 = await WorkOrders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (WorkOrder0?.setOrganization) {
    await WorkOrder0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const WorkOrder1 = await WorkOrders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (WorkOrder1?.setOrganization) {
    await WorkOrder1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const WorkOrder2 = await WorkOrders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (WorkOrder2?.setOrganization) {
    await WorkOrder2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const WorkOrder3 = await WorkOrders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (WorkOrder3?.setOrganization) {
    await WorkOrder3.setOrganization(relatedOrganization3);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await HumanResources.bulkCreate(HumanResourcesData);

    await Inventory.bulkCreate(InventoryData);

    await Machinery.bulkCreate(MachineryData);

    await QualityControl.bulkCreate(QualityControlData);

    await RawMaterials.bulkCreate(RawMaterialsData);

    await Suppliers.bulkCreate(SuppliersData);

    await WorkOrders.bulkCreate(WorkOrdersData);

    await Organizations.bulkCreate(OrganizationsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithOrganization(),

      await associateHumanResourceWithOrganization(),

      await associateInventoryWithOrganization(),

      await associateMachineryWithOrganization(),

      await associateQualityControlWithWork_order(),

      await associateQualityControlWithQuality_control_officer(),

      await associateQualityControlWithOrganization(),

      await associateRawMaterialWithOrganization(),

      await associateSupplierWithOrganization(),

      // Similar logic for "relation_many"

      await associateWorkOrderWithProduction_manager(),

      await associateWorkOrderWithOrganization(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('human_resources', null, {});

    await queryInterface.bulkDelete('inventory', null, {});

    await queryInterface.bulkDelete('machinery', null, {});

    await queryInterface.bulkDelete('quality_control', null, {});

    await queryInterface.bulkDelete('raw_materials', null, {});

    await queryInterface.bulkDelete('suppliers', null, {});

    await queryInterface.bulkDelete('work_orders', null, {});

    await queryInterface.bulkDelete('organizations', null, {});
  },
};
