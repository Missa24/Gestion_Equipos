import { TargetProfile } from '@/features/Dashboard/components/TargetProfile';
import { FormSupport } from '@/features/Support/components/FormSupport';

export default function Dashboard() {
    return (
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <TargetProfile />
                <div>
                    <FormSupport />
                </div>
            </div>
        </div>
    );
}