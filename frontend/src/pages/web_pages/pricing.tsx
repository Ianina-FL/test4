import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  FeaturesDesigns,
  HeroDesigns,
  PricingDesigns,
  TestimonialsDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

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
      name: 'Real-Time Inventory Tracking',
      description:
        'Monitor your inventory levels in real-time, ensuring optimal stock management and preventing shortages or overstocking.',
      icon: 'mdiWarehouse',
    },
    {
      name: 'Automated Work Order Management',
      description:
        'Streamline your production process with automated work order creation and tracking, improving efficiency and reducing manual errors.',
      icon: 'mdiClipboardFlow',
    },
    {
      name: 'Comprehensive Quality Assurance',
      description:
        'Implement quality checks at every stage of production, ensuring compliance and delivering high-quality products to your customers.',
      icon: 'mdiShieldCheck',
    },
  ];

  const pricing_features = {
    standard: {
      features: [
        'Basic Inventory Management',
        'Work Order Creation',
        'Quality Control Checks',
      ],
      limited_features: ['Limited Supplier Management', 'Basic HR Management'],
    },
    premium: {
      features: [
        'Advanced Inventory Management',
        'Automated Work Order Processing',
        'Integrated Quality Assurance',
      ],
      also_included: [
        'Comprehensive Supplier Management',
        'Enhanced HR Features',
      ],
    },
    business: {
      features: [
        'Full Inventory Suite',
        'Complete Work Order Automation',
        'End-to-End Quality Management',
        'Advanced Supplier and HR Management',
      ],
    },
  };

  const description = {
    standard:
      'The Standard plan is ideal for small manufacturers or individuals looking to manage basic manufacturing operations efficiently.',
    premium:
      'The Premium plan is perfect for small to medium-sized businesses seeking enhanced features and automation to boost productivity.',
    business:
      'The Business plan is designed for large enterprises requiring comprehensive management tools and full-featured ERP capabilities.',
  };

  const testimonials = [
    {
      text: 'Implementing ${projectName} has transformed our operations. The intuitive interface and robust features have significantly improved our efficiency.',
      company: 'TechnoCraft Industries',
      user_name: 'John Doe, Operations Manager',
    },
    {
      text: 'The seamless integration of inventory and work order management in ${projectName} has saved us countless hours. Highly recommend!',
      company: 'Innovate Manufacturing',
      user_name: 'Jane Smith, Production Lead',
    },
    {
      text: 'With ${projectName}, our quality control processes are more streamlined than ever. It has helped us maintain high standards effortlessly.',
      company: 'Precision Parts Co.',
      user_name: 'Michael Brown, Quality Assurance Officer',
    },
    {
      text: 'Our supplier management has never been easier. ${projectName} provides all the tools we need to keep our supply chain running smoothly.',
      company: 'Supply Solutions Ltd.',
      user_name: 'Emily White, Supplier Manager',
    },
    {
      text: "The HR management features in ${projectName} have made payroll and shift management a breeze. It's a must-have for any manufacturer.",
      company: 'Efficient Enterprises',
      user_name: 'David Green, HR Manager',
    },
    {
      text: 'The support team at ${projectName} is fantastic. They helped us tailor the system to our specific needs, ensuring a perfect fit.',
      company: 'Custom Creations Inc.',
      user_name: 'Sarah Johnson, CEO',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Pricing Plans - ${projectName}`}</title>
        <meta
          name='description'
          content={`Explore the flexible pricing plans of ${projectName} designed to meet the needs of manufacturers of all sizes. Choose the plan that best suits your business.`}
        />
      </Head>
      <WebSiteHeader projectName={'test4'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'test4'}
          image={['Pricing plans illustration']}
          mainText={`Flexible Pricing for ${projectName} Solutions`}
          subTitle={`Discover the perfect plan for your manufacturing needs with ${projectName}. Our pricing options are designed to offer value and scalability for businesses of all sizes.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`View Plans`}
        />

        <FeaturesSection
          projectName={'test4'}
          image={['Efficient manufacturing process illustration']}
          withBg={0}
          features={features_points}
          mainText={`Explore Key Features of ${projectName}`}
          subTitle={`Discover the powerful features of ${projectName} that enhance your manufacturing operations and drive efficiency.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <PricingSection
          projectName={'test4'}
          withBg={1}
          features={pricing_features}
          description={description}
        />

        <TestimonialsSection
          projectName={'test4'}
          design={TestimonialsDesigns.MULTI_CARD_DISPLAY || ''}
          testimonials={testimonials}
          mainText={`What Our Clients Say About ${projectName} `}
        />

        <ContactFormSection
          projectName={'test4'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Customer support team ready']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Have questions about our pricing plans? Contact our team at ${projectName} for personalized assistance. We are here to help and will respond promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'test4'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
