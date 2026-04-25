import type { PublicI18nSchema } from './publicEs';

export const publicEn: PublicI18nSchema = {
  public: {
    home: {
      title: 'Medical Equipment Rental',
      subtitle: 'Your medical team, in just one click',
      button: 'Start Exploring',
      cta: {
        title: 'Ready to explore?',
        button: 'Find Equipment',
      },
      features: {
        catalog: {
          title: 'Extensive Catalog',
          description:
            'Explore a wide range of medical equipment including oxygen concentrators, hospital beds, monitors, and more.',
        },
        availability: {
          title: 'Real-time Availability',
          description: 'Check equipment availability and stock status instantly without waiting.',
        },
        easy: {
          title: 'Easy Ordering',
          description: 'Complete your rental or purchase request in just a few simple steps.',
        },
        support: {
          title: 'Special Support',
          description: 'Get assistance whenever you need it. Our team is always ready to help.',
        },
      },
      whyChoose: 'Why Choose Rentamedic?',
    },
    aboutUs: {
      title: 'About Us',
      mission: {
        title: 'Our Mission',
        description:
          'At Rentamedic, our mission is to make medical equipment rental accessible, affordable, and hassle-free for individuals, clinics, and organizations across the region.',
      },
      vision: {
        title: 'Our Vision',
        description:
          'We envision a world where everyone has easy access to quality medical equipment without financial burden, fostering better health outcomes and improved quality of life.',
      },
      values: {
        title: 'Our Values',
        accessibility: {
          name: 'Accessibility',
          description: 'Making healthcare equipment available to everyone.',
        },
        reliability: {
          name: 'Reliability',
          description: 'Consistent quality and dependable service.',
        },
        transparency: {
          name: 'Transparency',
          description: 'Clear communication and honest practices.',
        },
        excellence: {
          name: 'Excellence',
          description: 'Continuous improvement in everything we do.',
        },
      },
      team: {
        title: 'Our Team',
        description:
          'Rentamedic is built by a dedicated team of healthcare professionals, technology experts, and customer service specialists.',
        members: {
          expertManagement: {
            name: 'Expert Management',
            role: 'Leadership',
            description: 'Experienced professionals leading the vision forward.',
          },
          healthSpecialists: {
            name: 'Healthcare Specialists',
            role: 'Product Team',
            description: 'Deep knowledge of medical equipment and patient needs.',
          },
          customerSupport: {
            name: 'Customer Support',
            role: 'Support Team',
            description: 'Dedicated to ensuring customer satisfaction.',
          },
        },
      },
    },
    contact: {
      title: 'Get in Touch',
      subtitle: "Have questions? We'd love to hear from you.",
      form: {
        nameLabel: 'Full Name',
        namePlaceholder: 'Enter your full name',
        emailLabel: 'Email',
        emailPlaceholder: 'Enter your email address',
        phoneLabel: 'Phone Number',
        phonePlaceholder: 'Enter your phone number',
        subjectLabel: 'Subject',
        subjectPlaceholder: 'What is this about?',
        messageLabel: 'Message',
        messagePlaceholder: 'Tell us your message...',
        submit: 'Send Message',
        success: 'Thank you! Your message has been sent successfully.',
        error: 'There was an error sending your message. Please try again.',
      },
      info: {
        title: 'Contact Information',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
      },
      support: {
        title: 'Business Hours',
        week: {
          title: 'Monday to Friday',
          schedule: '8:00 AM - 6:00 PM',
        },
        saturday: {
          title: 'Saturday',
          schedule: '9:00 AM - 1:00 PM',
        },
        sunday: {
          title: 'Sunday',
          schedule: 'Cerrado',
        },
      },
    },
  },
};
