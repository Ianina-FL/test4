import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FeaturesDesigns,
  AboutUsDesigns,
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'test4';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },

    {
      href: '/pricing',
      label: 'pricing',
    },
  ];

  const features_points = [
    {
      name: 'Raw Materials Management',
      description:
        'Efficiently track and manage your raw materials inventory, ensuring optimal stock levels and timely reordering to prevent production delays.',
      icon: 'mdiPackageVariant',
    },
    {
      name: 'Work Order Automation',
      description:
        'Create and manage work orders seamlessly, specifying materials, labor, and machinery needed for each production run, enhancing operational efficiency.',
      icon: 'mdiClipboardText',
    },
    {
      name: 'Quality Control Integration',
      description:
        'Implement quality checks at various production stages, maintaining compliance records and ensuring high standards for your finished products.',
      icon: 'mdiCheckCircle',
    },
  ];

  const faqs = [
    {
      question: 'What industries is ${projectName} best suited for?',
      answer:
        '${projectName} is specifically designed for the manufacturing industry, offering tailored solutions for production, inventory, and workforce management.',
    },
    {
      question: 'How does ${projectName} help with inventory management?',
      answer:
        '${projectName} allows you to efficiently track raw materials and finished goods, set reorder levels, and monitor stock usage to prevent shortages and overstocking.',
    },
    {
      question: 'Can I manage work orders with ${projectName}?',
      answer:
        'Yes, ${projectName} enables you to create and manage work orders, specifying the necessary materials, labor, and machinery for each production run.',
    },
    {
      question: 'Does ${projectName} support quality control processes?',
      answer:
        'Absolutely, ${projectName} integrates quality checks at various production stages, helping you maintain compliance and ensure product quality.',
    },
    {
      question: 'How does ${projectName} handle supplier management?',
      answer:
        '${projectName} helps you manage supplier relationships by tracking contract terms, delivery schedules, and payment records, ensuring smooth procurement processes.',
    },
    {
      question: 'Is there a feature for managing employee data?',
      answer:
        'Yes, ${projectName} includes a comprehensive HR module to manage employee roles, shifts, payroll, and compliance documentation.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Comprehensive ERP Solution for Manufacturing`}</title>
        <meta
          name='description'
          content={`Discover our robust ERP solution tailored for the manufacturing industry, streamlining production, inventory, and workforce management.`}
        />
      </Head>
      <WebSiteHeader projectName={'test4'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'test4'}
          image={['Efficient manufacturing process illustration']}
          mainText={`Transform Your Manufacturing with ${projectName}`}
          subTitle={`Streamline production, inventory, and workforce management with our comprehensive ERP solution tailored for the manufacturing industry.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Get Started Now`}
        />

        <FeaturesSection
          projectName={'test4'}
          image={['Streamlined manufacturing operations']}
          withBg={0}
          features={features_points}
          mainText={`Unlock Efficiency with ${projectName}`}
          subTitle={`Discover the powerful features of ${projectName} that streamline your manufacturing operations and enhance productivity.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <AboutUsSection
          projectName={'test4'}
          image={['Innovative ERP solution team']}
          mainText={`Empowering Manufacturing with ${projectName}`}
          subTitle={`${projectName} is dedicated to revolutionizing the manufacturing industry by providing a comprehensive ERP solution that simplifies production, inventory, and workforce management. Our mission is to enhance operational efficiency and drive growth for your business.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More About Us`}
        />

        <FaqSection
          projectName={'test4'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'test4'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Customer support team illustration']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Reach out to us anytime for inquiries or support. Our team at ${projectName} is here to assist you and will respond promptly to your messages.`}
        />
      </main>
      <WebSiteFooter projectName={'test4'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
