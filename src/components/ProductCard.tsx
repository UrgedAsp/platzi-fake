import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import { Product } from "../interfaces/Product";
import { heart, heartOutline } from "ionicons/icons";
import './ProductCard.css';
import { useFavoriteStore } from "../store/useFavoriteStore";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatDate = new Date(product.creationAt).toLocaleDateString();
  const { addFavorite, favorites, removeFavorite } = useFavoriteStore();

    const saveProduct = ()=>{
        if(favorites.includes(product)){
            removeFavorite(product.id);
        }else{
            addFavorite(product);
        }
    }

  return (
    <IonCard>
      <img src={product.images[0]} alt="Ocurrio un error cargando la imagen" />
      <IonCardHeader>
        <IonCardTitle>{product.title}</IonCardTitle>
        <IonCardSubtitle>{formatDate}</IonCardSubtitle>
        <IonCardSubtitle color={"dark"}>{product.price + '$'}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>{product.description}</IonCardContent>
      <IonButton onClick={saveProduct}>
        <IonIcon slot="end" icon={favorites.includes(product) ? heart : heartOutline} />
        {favorites.includes(product) ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
      </IonButton>
    </IonCard>
  );
};
