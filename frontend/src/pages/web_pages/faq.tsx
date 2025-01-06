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
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

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

  const faqs = [
    {
      question: 'What is ${projectName} and how does it work?',
      answer:
        '${projectName} is an ERP solution designed for the manufacturing industry. It helps manage production, inventory, and workforce efficiently through a centralized platform.',
    },
    {
      question: 'Can ${projectName} be customized for my business needs?',
      answer:
        'Yes, ${projectName} is highly customizable to fit the unique requirements of your manufacturing operations, ensuring a tailored solution for your business.',
    },
    {
      question: 'How secure is the data stored in ${projectName}?',
      answer:
        '${projectName} employs advanced security measures to protect your data, including encryption and regular security audits to ensure data integrity and privacy.',
    },
    {
      question: 'What kind of support is available for ${projectName} users?',
      answer:
        'We offer comprehensive support including setup assistance, training, and ongoing customer service to help you maximize the benefits of ${projectName}.',
    },
    {
      question: 'Is there a mobile version of ${projectName}?',
      answer:
        'Yes, ${projectName} is accessible on mobile devices, allowing you to manage your operations on-the-go with ease and flexibility.',
    },
    {
      question: 'How does ${projectName} handle updates and new features?',
      answer:
        'We regularly update ${projectName} with new features and improvements based on user feedback and industry trends, ensuring you always have the latest tools at your disposal.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}, our comprehensive ERP solution for the manufacturing industry.`}
        />
      </Head>
      <WebSiteHeader projectName={'test4'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'test4'}
          image={['FAQ section illustration']}
          mainText={`Your Questions Answered with ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to common questions about ${projectName} and how it can transform your manufacturing operations.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Learn More`}
        />

        <FaqSection
          projectName={'test4'}
          design={FaqDesigns.SPLIT_LIST || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'test4'}
          design={ContactFormDesigns.HIGHLIGHTED_DIVERSITY || ''}
          image={['Support team ready to assist']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`Have more questions? Contact our support team at ${projectName} for personalized assistance. We are here to help and will respond promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'test4'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
