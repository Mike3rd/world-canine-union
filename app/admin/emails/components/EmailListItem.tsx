// app/admin/emails/components/EmailListItem.tsx
import { SupportEmail } from '../types';

interface EmailListItemProps {
  email: SupportEmail;
  isSelected: boolean;
  onClick: () => void;
}

export default function EmailListItem({ email, isSelected, onClick }: EmailListItemProps) {
  // Determine status badge color
  const getStatusColor = () => {
    switch (email.status) {
      case 'unread':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-gray-100 text-gray-800';
      case 'replied':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${isSelected ? 'bg-blue-50 border-blue-200' : ''
        } ${email.status === 'unread' ? 'border-l-4 border-l-blue-500' : ''}`}
    >
      <div className="flex justify-between items-start">
        <div className="min-w-0 flex-1"> {/* Added for truncation */}
          <p className="font-semibold truncate">{email.from_name}</p>
          <p className="text-sm text-gray-600 truncate">{email.subject}</p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ml-2 flex-shrink-0 ${getStatusColor()}`}>
          {email.status}
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-1 truncate">
        {email.wcu_number || 'No WCU# linked'}
      </p>
      <p className="text-xs text-gray-400 mt-2">
        {email.received_at.toLocaleDateString()}
      </p>
    </div>
  );
}