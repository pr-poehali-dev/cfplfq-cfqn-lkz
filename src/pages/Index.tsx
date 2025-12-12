import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  material: string;
  collection: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Часы Classic Gold",
    brand: "Elegance",
    price: 145000,
    material: "Золото",
    collection: "Heritage",
    image: "https://cdn.poehali.dev/projects/113ddf97-c63e-4e36-9952-e97618d93877/files/d8b25291-03dd-4174-91db-7a6e33504532.jpg"
  },
  {
    id: 2,
    name: "Сумка Prestige",
    brand: "Luxor",
    price: 230000,
    material: "Кожа",
    collection: "Modern",
    image: "https://cdn.poehali.dev/projects/113ddf97-c63e-4e36-9952-e97618d93877/files/c74c7367-99e1-4406-9eaf-f54cf08f3957.jpg"
  },
  {
    id: 3,
    name: "Часы Royal Time",
    brand: "Elegance",
    price: 195000,
    material: "Платина",
    collection: "Heritage",
    image: "https://cdn.poehali.dev/projects/113ddf97-c63e-4e36-9952-e97618d93877/files/d8b25291-03dd-4174-91db-7a6e33504532.jpg"
  },
  {
    id: 4,
    name: "Портфель Executive",
    brand: "Luxor",
    price: 178000,
    material: "Кожа",
    collection: "Business",
    image: "https://cdn.poehali.dev/projects/113ddf97-c63e-4e36-9952-e97618d93877/files/c74c7367-99e1-4406-9eaf-f54cf08f3957.jpg"
  },
  {
    id: 5,
    name: "Браслет Diamond",
    brand: "Jewels",
    price: 320000,
    material: "Золото",
    collection: "Modern",
    image: "https://cdn.poehali.dev/projects/113ddf97-c63e-4e36-9952-e97618d93877/files/d8b25291-03dd-4174-91db-7a6e33504532.jpg"
  },
  {
    id: 6,
    name: "Клатч Evening",
    brand: "Luxor",
    price: 89000,
    material: "Шёлк",
    collection: "Evening",
    image: "https://cdn.poehali.dev/projects/113ddf97-c63e-4e36-9952-e97618d93877/files/c74c7367-99e1-4406-9eaf-f54cf08f3957.jpg"
  }
];

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [view, setView] = useState<'home' | 'catalog'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [priceRange, setPriceRange] = useState([0, 350000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);

  const brands = Array.from(new Set(products.map(p => p.brand)));
  const materials = Array.from(new Set(products.map(p => p.material)));
  const collections = Array.from(new Set(products.map(p => p.collection)));

  const filteredProducts = products.filter(product => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesMaterial = selectedMaterials.length === 0 || selectedMaterials.includes(product.material);
    const matchesCollection = selectedCollections.length === 0 || selectedCollections.includes(product.collection);
    
    return matchesPrice && matchesBrand && matchesMaterial && matchesCollection;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(prev =>
        prev.map(item => (item.id === productId ? { ...item, quantity } : item))
      );
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleFilter = (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const resetFilters = () => {
    setPriceRange([0, 350000]);
    setSelectedBrands([]);
    setSelectedMaterials([]);
    setSelectedCollections([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-serif font-bold tracking-wider">LUXE</h1>
          
          <nav className="hidden md:flex gap-8">
            <button
              onClick={() => setView('home')}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-accent ${
                view === 'home' ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              Главная
            </button>
            <button
              onClick={() => setView('catalog')}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-accent ${
                view === 'catalog' ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              Каталог
            </button>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="ShoppingBag" size={22} />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle className="font-serif text-2xl">Корзина</SheetTitle>
              </SheetHeader>
              
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <Card key={item.id} className="overflow-hidden">
                        <CardContent className="p-4 flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.brand}</p>
                            <p className="text-sm font-medium mt-1">
                              {item.price.toLocaleString('ru-RU')} ₽
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="text-sm w-8 text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto"
                              >
                                <Icon name="Trash2" size={14} />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <div className="border-t pt-4 mt-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-serif text-xl">Итого:</span>
                        <span className="font-serif text-2xl font-bold">
                          {cartTotal.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {view === 'home' && (
        <main>
          <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://cdn.poehali.dev/projects/113ddf97-c63e-4e36-9952-e97618d93877/files/4a942f79-3b77-40d5-a83d-3f63e989befe.jpg')`
              }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>
            
            <div className="relative z-10 text-center text-white px-4 animate-fade-in">
              <h2 className="font-serif text-6xl md:text-8xl font-bold mb-6 tracking-wide">
                Роскошь в деталях
              </h2>
              <p className="text-xl md:text-2xl mb-8 tracking-wide text-white/90">
                Эксклюзивные коллекции для истинных ценителей
              </p>
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-lg"
                onClick={() => setView('catalog')}
              >
                Смотреть каталог
              </Button>
            </div>
          </section>

          <section className="py-20 px-4">
            <div className="container mx-auto">
              <h3 className="font-serif text-4xl md:text-5xl text-center mb-16">
                Избранные коллекции
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {['Heritage', 'Modern', 'Evening'].map((collection, idx) => {
                  const collectionProducts = products.filter(p => p.collection === collection);
                  return (
                    <Card
                      key={collection}
                      className="group overflow-hidden cursor-pointer transition-all hover:shadow-xl animate-fade-in"
                      style={{ animationDelay: `${idx * 150}ms` }}
                      onClick={() => {
                        setView('catalog');
                        setSelectedCollections([collection]);
                      }}
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={collectionProducts[0]?.image}
                          alt={collection}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <CardContent className="p-6 text-center">
                        <h4 className="font-serif text-2xl mb-2">{collection}</h4>
                        <p className="text-muted-foreground">
                          {collectionProducts.length} товаров
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      )}

      {view === 'catalog' && (
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="md:w-80 space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif text-2xl">Фильтры</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-accent"
                >
                  Сбросить
                </Button>
              </div>

              <div className="space-y-6 border rounded-lg p-6">
                <div>
                  <h4 className="font-medium mb-4">Цена</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={350000}
                    step={10000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{priceRange[0].toLocaleString('ru-RU')} ₽</span>
                    <span>{priceRange[1].toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Бренды</h4>
                  <div className="space-y-3">
                    {brands.map(brand => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleFilter(brand, setSelectedBrands)}
                        />
                        <label
                          htmlFor={`brand-${brand}`}
                          className="text-sm cursor-pointer"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Материалы</h4>
                  <div className="space-y-3">
                    {materials.map(material => (
                      <div key={material} className="flex items-center space-x-2">
                        <Checkbox
                          id={`material-${material}`}
                          checked={selectedMaterials.includes(material)}
                          onCheckedChange={() => toggleFilter(material, setSelectedMaterials)}
                        />
                        <label
                          htmlFor={`material-${material}`}
                          className="text-sm cursor-pointer"
                        >
                          {material}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Коллекции</h4>
                  <div className="space-y-3">
                    {collections.map(collection => (
                      <div key={collection} className="flex items-center space-x-2">
                        <Checkbox
                          id={`collection-${collection}`}
                          checked={selectedCollections.includes(collection)}
                          onCheckedChange={() => toggleFilter(collection, setSelectedCollections)}
                        />
                        <label
                          htmlFor={`collection-${collection}`}
                          className="text-sm cursor-pointer"
                        >
                          {collection}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1">
              <div className="mb-6">
                <h2 className="font-serif text-3xl mb-2">Каталог</h2>
                <p className="text-muted-foreground">
                  Найдено товаров: {filteredProducts.length}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, idx) => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden animate-scale-in"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-2">
                        {product.collection}
                      </Badge>
                      <h3 className="font-serif text-xl mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                      <p className="text-xs text-muted-foreground mb-4">{product.material}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-xl font-bold">
                          {product.price.toLocaleString('ru-RU')} ₽
                        </span>
                        <Button
                          size="sm"
                          onClick={() => addToCart(product)}
                          className="bg-accent text-accent-foreground hover:bg-accent/90"
                        >
                          <Icon name="Plus" size={16} className="mr-1" />
                          В корзину
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <Icon name="PackageOpen" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-serif text-2xl mb-2">Товары не найдены</h3>
                  <p className="text-muted-foreground mb-4">
                    Попробуйте изменить параметры фильтрации
                  </p>
                  <Button onClick={resetFilters} variant="outline">
                    Сбросить фильтры
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Index;