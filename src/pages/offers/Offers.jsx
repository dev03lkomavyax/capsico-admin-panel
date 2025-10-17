import AdminWrapper from '@/components/admin-wrapper/AdminWrapper';
import AllOffers from '@/components/offers/AllOffers';
import CreateOffer from '@/components/offers/CreateOffer';
import TrackOffer from '@/components/offers/TrackOffer';
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Offers = () => {
    const [isCreateOffer, setIsCreateOffer] = useState(false);
    const navigate = useNavigate()
    const {pathname} = useLocation()

    return (
      <AdminWrapper>
        <section className="w-full">
          <div className="px-5 flex gap-4">
            <button
              onClick={() => setIsCreateOffer(true)}
              className={`py-3 px-2 font-inter class-base1 border-b-4 ${
                isCreateOffer
                  ? "primary-color  border-[#1AA6F1]"
                  : "border-transparent"
              }`}
            >
              Create offers
            </button>
            <button
              onClick={() => setIsCreateOffer(false)}
              className={`py-3 px-2 font-inter class-base1 border-b-4 ${
                isCreateOffer
                  ? "border-transparent"
                  : "primary-color border-[#1AA6F1]"
              }`}
            >
              Track Offers
            </button>
            <button
              onClick={() => navigate(`/admin/offers/promoted-offer`)}
              className={`py-3 px-2 font-inter class-base1 border-b-4 ${
                pathname.includes("promoted-offer")
                ? "primary-color border-[#1AA6F1]"
                : "border-transparent"
              }`}
            >
              Promoted Offers
            </button>
          </div>
          <div className="px-5">
            {isCreateOffer ? <CreateOffer /> : <AllOffers />}
          </div>
        </section>
      </AdminWrapper>
    );
}

export default Offers