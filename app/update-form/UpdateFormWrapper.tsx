'use client';

import { useSearchParams } from 'next/navigation';
import UpdateForm from './UpdateForm';

export default function UpdateFormWrapper() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    return <UpdateForm token={token} />;
}