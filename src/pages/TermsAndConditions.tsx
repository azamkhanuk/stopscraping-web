import React from 'react';

const TermsAndConditions: React.FC = () => {
    return (
        <article className="max-w-3xl mx-auto text-white">
            <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
            <p className="mb-8">Last updated: 02/09/2024</p>

            {[
                {
                    title: "1. Acceptance of Terms",
                    content: 'By accessing and using stopscraping.me ("the Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you disagree with any part of these Terms, you may not use our Service.'
                },
                {
                    title: "2. Description of Service",
                    content: 'stopscraping.me provides a service that offers up-to-date lists of IP addresses associated with known AI web scrapers. This service is intended to help website owners protect their content from unauthorized scraping.'
                },
                {
                    title: "3. User Accounts",
                    subsections: [
                        {
                            title: "3.1.",
                            content: "You must create an account to use certain features of the Service. You are responsible for maintaining the confidentiality of your account information."
                        },
                        {
                            title: "3.2.",
                            content: "You are responsible for all activities that occur under your account."
                        }
                    ]
                },
                {
                    title: "4. API Usage",
                    subsections: [
                        {
                            title: "4.1.",
                            content: "The Service provides API keys for accessing our IP lists. You agree not to share your API key with third parties."
                        },
                        {
                            title: "4.2.",
                            content: "We reserve the right to limit or terminate API access if we detect abuse or excessive usage."
                        }
                    ]
                },
                {
                    title: "5. Payment and Refunds",
                    subsections: [
                        {
                            title: "5.1.",
                            content: "Some features of the Service require payment. By choosing a paid plan, you agree to pay the fees associated with that plan."
                        },
                        {
                            title: "5.2.",
                            content: "All payments are non-refundable unless otherwise stated or required by law."
                        }
                    ]
                },
                {
                    title: "6. Intellectual Property",
                    subsections: [
                        {
                            title: "6.1.",
                            content: "The Service and its original content, features, and functionality are owned by stopscraping.me and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws."
                        }
                    ]
                },
                {
                    title: "7. Limitation of Liability",
                    subsections: [
                        {
                            title: "7.1.",
                            content: "stopscraping.me shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the Service."
                        }
                    ]
                },
                {
                    title: "8. Disclaimer of Warranties",
                    subsections: [
                        {
                            title: "8.1.",
                            content: 'The Service is provided "as is" and "as available" without any warranties of any kind.'
                        }
                    ]
                },
                {
                    title: "9. Changes to Terms",
                    subsections: [
                        {
                            title: "9.1.",
                            content: "We reserve the right to modify or replace these Terms at any time. We will provide notice of any significant changes."
                        }
                    ]
                },
                {
                    title: "10. Governing Law",
                    subsections: [
                        {
                            title: "10.1.",
                            content: "These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction]."
                        }
                    ]
                },
                {
                    title: "11. Termination",
                    subsections: [
                        {
                            title: "11.1.",
                            content: "We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason."
                        }
                    ]
                },
                {
                    title: "12. Contact Information",
                    content: "If you have any questions about these Terms, please contact us at [Your Contact Email]."
                },
                {
                    title: "13. Neutrality Statement",
                    content: 'stopscraping.me is an independent service provider and is not affiliated with, endorsed by, or in any way officially connected with any AI companies or organizations. Our service is designed to provide tools for website owners to manage access to their content, and we do not have any agenda against AI companies or their operations. We aim to maintain a neutral stance and provide our service as a tool for content protection, irrespective of the source of web scraping activities.',
                    highlight: true
                }
            ].map((section, index) => (
                <section key={index} className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                    {section.content && (
                        <p className={`mb-4 ${section.highlight ? 'bg-gray-800 p-4 rounded' : ''}`}>{section.content}</p>
                    )}
                    {section.subsections && section.subsections.map((subsection, subIndex) => (
                        <p key={subIndex} className="mb-2">
                            <span className="font-medium">{subsection.title}</span> {subsection.content}
                        </p>
                    ))}
                </section>
            ))}
            <p className="mt-8">By using stopscraping.me, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
        </article>
    );
};

export default TermsAndConditions;