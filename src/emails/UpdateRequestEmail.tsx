// /components/emails/UpdateRequestEmail.tsx
import React from 'react';

interface UpdateRequestEmailProps {
    dogName: string;
    ownerName: string;
    wcuNumber: string;
    updateLink: string;
    hoursValid: number;
}

export const UpdateRequestEmail: React.FC<UpdateRequestEmailProps> = ({
    dogName,
    ownerName,
    wcuNumber,
    updateLink,
    hoursValid = 24,
}) => {
    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
            color: '#263238',
            lineHeight: '1.6'
        }}>
            {/* Header */}
            <div style={{
                textAlign: 'center',
                marginBottom: '30px',
                paddingBottom: '20px',
                borderBottom: '1px solid #CFD8DC'
            }}>
                <h1 style={{
                    color: '#992400',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    margin: '0 0 10px 0'
                }}>
                    World Canine Union
                </h1>
                <p style={{
                    color: '#78909C',
                    fontSize: '16px',
                    margin: '0'
                }}>
                    Update Request for {dogName}
                </p>
            </div>

            {/* Greeting */}
            <p style={{ fontSize: '16px', marginBottom: '20px' }}>
                Dear {ownerName},
            </p>

            <p style={{ fontSize: '16px', marginBottom: '20px' }}>
                You've requested to update information for <strong>{dogName}</strong> (Registration: {wcuNumber}) in the World Canine Union registry.
            </p>

            {/* Secure Link Card */}
            <div style={{
                backgroundColor: '#f8f9fa',
                padding: '25px',
                borderRadius: '8px',
                margin: '25px 0',
                borderLeft: '4px solid #992400'
            }}>
                <h3 style={{
                    marginTop: '0',
                    marginBottom: '15px',
                    color: '#36454F',
                    fontSize: '18px'
                }}>
                    🔒 Secure Update Link
                </h3>

                <p style={{ marginBottom: '20px' }}>
                    Click the button below to access the update form. This link is valid for <strong>{hoursValid} hours</strong> and can only be used once:
                </p>

                <div style={{ margin: '25px 0', textAlign: 'center' }}>
                    <a
                        href={updateLink}
                        style={{
                            display: 'inline-block',
                            backgroundColor: '#992400',
                            color: 'white',
                            padding: '14px 32px',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            fontSize: '16px'
                        }}
                    >
                        Update {dogName}'s Information
                    </a>
                </div>

                <p style={{
                    fontSize: '14px',
                    color: '#546E7A',
                    backgroundColor: '#FFFFFF',
                    padding: '12px',
                    borderRadius: '4px',
                    border: '1px solid #CFD8DC'
                }}>
                    <strong>Link:</strong> {updateLink}
                </p>
            </div>

            {/* What You Can Update */}
            <div style={{
                marginTop: '30px',
                padding: '20px',
                backgroundColor: '#f0f7ff',
                borderRadius: '8px'
            }}>
                <h4 style={{
                    color: '#36454F',
                    marginTop: '0',
                    marginBottom: '15px',
                    fontSize: '16px'
                }}>
                    📝 What You Can Update
                </h4>
                <ul style={{
                    marginBottom: '0',
                    paddingLeft: '20px'
                }}>
                    <li>Update your contact information</li>
                    <li>Add or update photos</li>
                    <li>Share new stories or achievements</li>
                    <li>Update living profile to memorial profile</li>
                    <li>Update memorial information if needed</li>
                    <li>Correct any outdated information</li>
                </ul>
            </div>

            <p style={{
                marginTop: '20px',
                fontSize: '14px',
                color: '#546E7A',
                padding: '15px',
                backgroundColor: '#E8F5E9',
                borderRadius: '6px',
                border: '1px solid #C8E6C9'
            }}>
                <strong>⏰ Reminder:</strong> Your admin will review the updates within <strong>24-48 hours</strong>.
                You can check back on your dog's profile page to see when updates are approved:
                <br />
                <a
                    href={`https://worldcanineunion.org/dog/${wcuNumber}`}
                    style={{ color: '#2E7D32', textDecoration: 'underline' }}
                >
                    https://worldcanineunion.org/dog/{wcuNumber}
                </a>
            </p>

            <p style={{
                marginTop: '20px',
                fontSize: '14px',
                color: '#546E7A',
                padding: '15px',
                backgroundColor: '#FFF3E0',
                borderRadius: '6px',
                border: '1px solid #FFE0B2'
            }}>
                <strong>📝 Note:</strong> You won't receive another email when your updates are approved.
                Please check the profile page above after 24-48 hours to see the changes.
            </p>

            {/* Security Notice */}
            <p style={{
                marginTop: '30px',
                fontSize: '14px',
                color: '#546E7A',
                padding: '15px',
                backgroundColor: '#FFF3E0',
                borderRadius: '6px',
                border: '1px solid #FFE0B2'
            }}>
                <strong>🔐 Security Notice:</strong> If you didn't request this update link, please ignore this email or contact us if you have concerns.
            </p>

            <hr style={{
                margin: '30px 0',
                border: 'none',
                borderTop: '1px solid #e0e0e0'
            }} />

            {/* Footer */}
            <p style={{
                fontSize: '12px',
                color: '#78909C',
                textAlign: 'center'
            }}>
                Need help? Email mike@worldcanineunion.org<br />
                © {new Date().getFullYear()} World Canine Union. All rights reserved.
            </p>
        </div>
    );
};