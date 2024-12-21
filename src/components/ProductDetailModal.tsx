import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, X } from 'lucide-react';
import { useCart } from '../components/cart/CartProvider';
import { useToast } from "@/hooks/use-toast";
import { playTickSound } from '../utils/audio';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    material: string;
    color: string;
    price: number;
    image: string;
    description: string;
    status: string;
  };
}

const ProductDetailModal = ({ isOpen, onClose, product }: ProductDetailModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });

    playTickSound();

    toast({
      title: "Produit ajouté au panier",
      description: `${quantity} x ${product.name} ajouté avec succès`,
      duration: 5000,
      className: "bg-red-50 border-red-200",
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-full p-4 bg-white rounded-lg shadow-lg overflow-hidden mx-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-50"
          aria-label="Fermer"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        <div className="flex flex-col">
          <div className="bg-gray-50 p-4 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain max-h-[300px] transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>

          <div className="p-4 space-y-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
              <p className="text-sm text-gray-500">REF: {product.id.toString().padStart(6, '0')}</p>
            </div>

            <div className="text-2xl font-bold text-[#471818]">{product.price} TND</div>

            <div className="space-y-2">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700">Matière</h3>
                <p className="text-gray-600">{product.material}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700">Statut</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === 'En stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.status}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Quantité</span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={decrementQuantity} className="h-8 w-8">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-gray-700 font-medium">{quantity}</span>
                <Button variant="outline" size="icon" onClick={incrementQuantity} className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              className="w-full bg-[#471818] hover:bg-[#2d0f0f] text-white py-4 rounded-md flex items-center justify-center gap-2 transition-all"
              onClick={handleAddToCart}
              disabled={product.status !== 'En stock'}
            >
              <ShoppingCart className="h-5 w-5" />
              {product.status === 'En stock' ? 'Ajouter au panier' : 'Produit épuisé'}
            </Button>

            <div className="text-sm text-gray-500 space-y-1">
              <p>• Livraison gratuite en Tunisie</p>
              <p>• Retours gratuits sous 14 jours</p>
              <p>• Service client disponible 24/7</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
