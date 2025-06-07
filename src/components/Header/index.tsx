import './header.css';
import Image from "next/image";
import LogoFravega from '@/src/assets/logo-fravega.png'
import SearchBar from "../SearchBar";
import { CACHE_KEY_FAVORITES, countFavorites } from "@/src/cache/favorites";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAlert from "../Alert/hooks/useAlert";
import routes from '@/src/utils/routes';
import Alert from '../Alert';

export interface HeaderProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function Header({
   value,
   onChange,
   onSubmit
}: HeaderProps) {
   const [totalFavorites, setTotalFavorites] = useState(0);
   const { message, isVisible, hideToast, showToast } = useAlert();
   const router = useRouter();

   useEffect(() => {
      const updateFavorites = () => setTotalFavorites(countFavorites());
      // Nos suscribimos al evento de cambio de favoritos que tenemos en cache
      window.addEventListener(CACHE_KEY_FAVORITES, updateFavorites);
      // Precargamos el estado de favoritos en cache
      updateFavorites();
      return () => {
         window.removeEventListener(CACHE_KEY_FAVORITES, updateFavorites);
      };
   }, []);

   const redirectFavorites = () => {
      if(totalFavorites > 0) {
         router.push(routes.favorites);
         return;
      }
      showToast('No hay usuarios favoritos, para ello debes seleccionar al menos uno !');
   }

   const redirectHome = () => {
      router.push(routes.home);
   }

   return (
      <header className="header-container">
         <div className="header-content">
            <section className="header-section section-left">
               <Image
                  onClick={redirectHome}
                  src={LogoFravega}
                  alt="logo"
                  className="logo-fravega"
                  priority />
            </section>
            <section className="header-section section-center">
               <SearchBar value={value} onChange={onChange} onSubmit={onSubmit} />
            </section>
            <section className="header-section section-right" onClick={redirectFavorites}>Favoritos ({totalFavorites})</section>
         </div>
         <Alert message={message} isVisible={isVisible} onClose={hideToast}  />
      </header>
   )
}
