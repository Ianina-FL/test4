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
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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
      question: 'What is the main purpose of ${projectName}?',
      answer:
        '${projectName} is designed to streamline manufacturing operations by managing production, inventory, and workforce efficiently, providing a comprehensive ERP solution.',
    },
    {
      question: 'How can I get started with ${projectName}?',
      answer:
        'To get started, contact our support team through the contact form. We will guide you through the setup process and tailor the solution to your needs.',
    },
    {
      question: 'Is there a trial version available?',
      answer:
        'Yes, we offer a trial version of ${projectName} so you can explore its features and see how it fits your manufacturing needs before committing.',
    },
    {
      question: 'Can ${projectName} integrate with other systems?',
      answer:
        'Absolutely, ${projectName} is designed to integrate seamlessly with various other systems, ensuring smooth data flow and operational efficiency.',
    },
    {
      question: 'What kind of support does ${projectName} offer?',
      answer:
        'We provide comprehensive support including setup assistance, troubleshooting, and ongoing customer service to ensure you get the most out of ${projectName}.',
    },
    {
      question: 'How secure is my data with ${projectName}?',
      answer:
        'Data security is a top priority for us. ${projectName} employs advanced security measures to protect your data and ensure privacy.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Us - ${projectName}`}</title>
        <meta
          name='description'
          content={`Get in touch with ${projectName} for any inquiries or support. Our team is here to assist you with your manufacturing ERP needs.`}
        />
      </Head>
      <WebSiteHeader projectName={'test4'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'test4'}
          image={['Friendly customer support team']}
          mainText={`Reach Out to ${projectName} Today`}
          subTitle={`We're here to help with any questions or support you need. Contact ${projectName} and let us assist you in optimizing your manufacturing operations.`}
          design={HeroDesigns.IMAGE_LEFT || ''}
          buttonText={`Contact Us Now`}
        />

        <FaqSection
          projectName={'test4'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Common Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'test4'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Customer service representative']}
          mainText={`Connect with ${projectName} Support `}
          subTitle={`Feel free to reach out to us anytime. Our team at ${projectName} is ready to assist you and will respond promptly to your inquiries.`}
        />
      </main>
      <WebSiteFooter projectName={'test4'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
