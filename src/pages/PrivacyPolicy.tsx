import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <article className="max-w-3xl mx-auto text-white">
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
            <p className="mb-8">Last updated: 02/09/2024</p>

            {[
                {
                    title: "1. Introduction",
                    content: 'Welcome to stopscraping.me ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This privacy policy describes how we collect, use, and share your personal information when you use our service.'
                },
                {
                    title: "2. Information We Collect",
                    content: "We collect the following types of information:",
                    subsections: [
                        {
                            title: "a) Information provided by Clerk authentication service:",
                            items: [
                                "User ID (used to link to your API keys in our database)",
                                "Email address (for communication purposes)"
                            ]
                        },
                        {
                            title: "b) Usage Data:",
                            items: [
                                "IP address",
                                "Browser type and version",
                                "Pages of our service that you visit",
                                "Time and date of your visit",
                                "Time spent on those pages"
                            ]
                        },
                        {
                            title: "c) API Key Information:",
                            items: [
                                "API keys associated with your account"
                            ]
                        }
                    ]
                },
                {
                    title: "3. How We Use Your Information",
                    content: "We use the information we collect to:",
                    items: [
                        "Provide and maintain our service",
                        "Notify you about changes to our service",
                        "Allow you to participate in interactive features of our service",
                        "Provide customer support",
                        "Gather analysis or valuable information to improve our service",
                        "Monitor the usage of our service",
                        "Detect, prevent and address technical issues"
                    ]
                },
                {
                    title: "4. Data Storage and Security",
                    content: "We use Supabase to store API keys associated with user accounts. We implement appropriate technical and organisational measures to protect your personal data against unauthorised or unlawful processing, accidental loss, destruction or damage."
                },
                {
                    title: "5. Data Sharing and Disclosure",
                    content: "We do not sell your personal information. We may disclose your personal information in the following situations:",
                    items: [
                        "To comply with a legal obligation",
                        "To protect and defend our rights or property",
                        "To prevent or investigate possible wrongdoing in connection with the service",
                        "To protect the personal safety of users of the service or the public",
                        "To protect against legal liability"
                    ]
                },
                {
                    title: "6. Your Data Protection Rights",
                    content: "Under the UK General Data Protection Regulation (UK GDPR), you have certain data protection rights. These include:",
                    items: [
                        "The right to access, update or delete your personal information",
                        "The right of rectification",
                        "The right to object",
                        "The right of restriction",
                        "The right to data portability",
                        "The right to withdraw consent"
                    ]
                },
                {
                    title: "7. Children's Privacy",
                    content: "Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13."
                },
                {
                    title: "8. Changes to This Privacy Policy",
                    content: 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.'
                },
                {
                    title: "9. Contact Us",
                    content: "If you have any questions about this Privacy Policy, please contact us."
                },
                {
                    title: "10. Supervisory Authority",
                    content: 'If you are a resident in the European Economic Area or the United Kingdom and you believe we are unlawfully processing your personal information, you have the right to complain to your local data protection supervisory authority. In the UK, this is the Information Commissioner\'s Office (ICO).'
                }
            ].map((section, index) => (
                <section key={index} className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                    <p className="mb-4">{section.content}</p>
                    {section.subsections && section.subsections.map((subsection, subIndex) => (
                        <div key={subIndex} className="mb-4">
                            <h3 className="text-xl font-medium mb-2">{subsection.title}</h3>
                            <ul className="list-disc pl-5">
                                {subsection.items.map((item, itemIndex) => (
                                    <li key={itemIndex} className="mb-1">{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    {section.items && (
                        <ul className="list-disc pl-5">
                            {section.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="mb-1">{item}</li>
                            ))}
                        </ul>
                    )}
                </section>
            ))}
        </article>
    );
};

export default PrivacyPolicy;