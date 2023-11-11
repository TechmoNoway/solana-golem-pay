import { useRouter } from 'next/router';
import BackLink from '../components/BackLink';
import Confirmed from '../components/Confirmed/Confirmed';
import PageHeading from '../components/PageHeading/PageHeading';

export default function ConfirmedPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center gap-8">
            <BackLink href="/">Next order</BackLink>

            <PageHeading>Thankyou, enjoy your cookies!</PageHeading>

            <div className="h-80 w-80">
                <Confirmed />
            </div>
        </div>
    );
}
