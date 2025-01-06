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
  PricingDesigns,
  ContactFormDesigns,
  TestimonialsDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

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
      name: 'Advanced Inventory Management',
      description:
        'Keep your inventory organized and efficient with real-time tracking, automated reorder alerts, and comprehensive usage reports to minimize waste and maximize productivity.',
      icon: 'mdiWarehouse',
    },
    {
      name: 'Seamless Work Order Processing',
      description:
        'Streamline your production workflow with automated work order creation, resource allocation, and progress tracking, ensuring timely and efficient manufacturing processes.',
      icon: 'mdiClipboardFlow',
    },
    {
      name: 'Integrated Quality Assurance',
      description:
        'Maintain high standards with integrated quality checks at every production stage, ensuring compliance and delivering superior products to your customers.',
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
      text: 'Since implementing ${projectName}, our production efficiency has skyrocketed. The intuitive interface and robust features have transformed our operations.',
      company: 'TechnoCraft Industries',
      user_name: 'John Doe, Operations Manager',
    },
    {
      text: '${projectName} has been a game-changer for us. The seamless integration of inventory and work order management has saved us countless hours.',
      company: 'Innovate Manufacturing',
      user_name: 'Jane Smith, Production Lead',
    },
    {
      text: 'The quality control features in ${projectName} have helped us maintain high standards and compliance effortlessly. Highly recommend!',
      company: 'Precision Parts Co.',
      user_name: 'Michael Brown, Quality Assurance Officer',
    },
    {
      text: 'Our supplier management has never been easier. ${projectName} provides all the tools we need to keep our supply chain running smoothly.',
      company: 'Supply Solutions Ltd.',
      user_name: 'Emily White, Supplier Manager',
    },
    {
      text: 'With ${projectName}, we have a comprehensive view of our HR data, making payroll and shift management a breeze.',
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
        <title>{`Our Services - ${projectName}`}</title>
        <meta
          name='description'
          content={`Explore the comprehensive services offered by ${projectName}, designed to streamline manufacturing operations and enhance productivity.`}
        />
      </Head>
      <WebSiteHeader projectName={'test4'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'test4'}
          image={['Manufacturing process optimization illustration']}
          mainText={`Elevate Your Operations with ${projectName}`}
          subTitle={`Discover the tailored services of ${projectName} that streamline manufacturing processes, enhance productivity, and drive business growth.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore Our Services`}
        />

        <FeaturesSection
          projectName={'test4'}
          image={['Efficient manufacturing service illustration']}
          withBg={1}
          features={features_points}
          mainText={`Comprehensive Services by ${projectName}`}
          subTitle={`Explore the key features of ${projectName} that empower your manufacturing operations with efficiency and precision.`}
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
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL || ''}
          testimonials={testimonials}
          mainText={`What Our Clients Say About ${projectName} `}
        />

        <ContactFormSection
          projectName={'test4'}
          design={ContactFormDesigns.HIGHLIGHTED || ''}
          image={['Customer service team illustration']}
          mainText={`Connect with ${projectName} Today `}
          subTitle={`Reach out to us for any inquiries or support. Our team at ${projectName} is ready to assist you and will respond promptly to your messages.`}
        />
      </main>
      <WebSiteFooter projectName={'test4'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
