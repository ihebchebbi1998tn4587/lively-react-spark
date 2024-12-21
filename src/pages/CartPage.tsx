import React, { useState, Suspense } from 'react';
import { useCart } from '../components/cart/CartProvider';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import TopNavbar from '../components/TopNavbar';
import { useToast } from "@/hooks/use-toast";
import Footer from '@/components/Footer';
import BrandNavbarSection from "@/components/productsPages/BrandNavbarSection";
import { motion } from "framer-motion";
import { UserDetails, getUserDetails } from '@/utils/userDetailsStorage';
import BackButton from '@/components/cart/BackButton';
import EmptyCartMessage from '@/components/cart/EmptyCartMessage';

// Lazy load components that might not be immediately needed
const UserDetailsForm = React.lazy(() => import('@/components/cart/UserDetailsForm'));
const OrderSummary = React.lazy(() => import('@/components/cart/OrderSummary'));
const CartItemCard = React.lazy(() => import('@/components/cart/CartItemCard'));

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(getUserDetails());
  const [isEditing, setIsEditing] = useState(false);

  // Memoize calculations to improve performance
  const total = React.useMemo(() => 
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );
  const shipping = total > 500 ? 0 : 7;
  const finalTotal = total + shipping;

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
      toast({
        title: "Panier mis à jour",
        description: "La quantité a été mise à jour avec succès",
        style: {
          backgroundColor: '#700100',
          color: 'white',
          border: '1px solid #590000',
        },
      });
    }
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
    toast({
      title: "Article supprimé",
      description: "L'article a été retiré du panier",
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });
  };

  const handleEditDetails = () => setIsEditing(true);

  const handleDeleteDetails = () => {
    localStorage.removeItem('userDetails');
    setUserDetails(null);
    toast({
      title: "Informations supprimées",
      description: "Vos informations ont été supprimées avec succès",
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });
  };

  const handleFormComplete = (details: UserDetails) => {
    setUserDetails(details);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#F1F0FB]">
      <Helmet>
        <title>Mon Panier | Fiori - Vêtements Personnalisés</title>
        <meta name="description" content="Gérez votre panier d'achats Fiori. Découvrez notre collection de vêtements personnalisés et haut de gamme en Tunisie." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://www.fiori.com/cart" />
      </Helmet>

      <TopNavbar />
      <div className="flex-grow">
        <BrandNavbarSection />
        <div className="container mx-auto px-4 py-4 space-y-4 mt-24">
          <BackButton onClick={() => navigate('/')} />
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-serif text-[#1A1F2C]"
          >
            Mon Panier ({cartItems.length} articles)
          </motion.h1>
          
          {cartItems.length === 0 ? (
            <EmptyCartMessage onNavigate={() => navigate('/')} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-4 bg-white/50 p-6 rounded-xl backdrop-blur-sm shadow-sm">
                  <Suspense fallback={<div className="animate-pulse h-96 bg-gray-100 rounded-lg" />}>
                    {cartItems.map((item) => (
                      <CartItemCard
                        key={item.id}
                        item={{...item, price: item.price}}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemoveItem}
                      />
                    ))}
                  </Suspense>
                </div>
                
                {(!userDetails || isEditing) && (
                  <div className="bg-white/50 p-6 rounded-xl backdrop-blur-sm shadow-sm">
                    <Suspense fallback={<div className="animate-pulse h-96 bg-gray-100 rounded-lg" />}>
                      <UserDetailsForm 
                        onComplete={handleFormComplete}
                        initialData={userDetails}
                      />
                    </Suspense>
                  </div>
                )}
              </div>
              
              <div className="lg:sticky lg:top-8">
                <Suspense fallback={<div className="animate-pulse h-96 bg-gray-100 rounded-lg" />}>
                  <OrderSummary
                    total={total}
                    shipping={shipping}
                    finalTotal={finalTotal}
                    userDetails={userDetails}
                    cartItems={cartItems}
                    onEditDetails={!isEditing ? handleEditDetails : undefined}
                    onDeleteDetails={!isEditing ? handleDeleteDetails : undefined}
                  />
                </Suspense>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;