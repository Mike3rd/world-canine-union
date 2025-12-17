import React from 'react';

interface WelcomeEmailProps {
    dogName: string;
    ownerName: string;
    wcuNumber: string;
    pdfUrl: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
    dogName,
    ownerName,
    wcuNumber,
    pdfUrl,
}) => {
    return (
        <div>
            <h1>Welcome to World Canine Union!</h1>
            <p>Dear {ownerName},</p>
            <p>
                Welcome to the World Canine Union family! We're thrilled to welcome{' '}
                <strong>{dogName}</strong> to our global registry of celebrated mixed-breed and rescue dogs.
            </p>

            <div>
                <h3>Your Official WCU Number</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    {wcuNumber}
                </p>
                <p><em>Save this number - it's {dogName}'s permanent ID in our registry!</em></p>
            </div>

            <div>
                <h3>📄 Your Official Certificate</h3>
                <p>Download your beautifully designed WCU registration certificate:</p>
                <a href={pdfUrl}>Download Certificate PDF</a>
            </div>

            <div>
                <h3>📄 Your Dog's Online Profile </h3>
                <p>View your dog's online eternal profile page:</p>
                <p>View {dogName}'s profile: https://worldcanineunion.org/dog/{wcuNumber}</p>
            </div>



            <div>
                <h3>What's Next?</h3>
                <ul>
                    <li>Save your WCU number for future reference</li>
                    <li>Print and display your certificate</li>
                    <li>Share your dog's story with friends and family</li>
                    <li>Follow us for updates on new features coming soon</li>
                </ul>
            </div>

            <p>With warm regards,</p>
            <p>The World Canine Union Team</p>

            <hr />

            <p style={{ fontSize: '12px', color: '#666' }}>
                Need help? Email support@worldcanineunion.org
            </p>
        </div>
    );
};