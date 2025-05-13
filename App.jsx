import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('exterior');
  const headerTitleRef = useRef(null);
  const headerSubtitleRef = useRef(null);

  // Animation on scroll
  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const handleScroll = () => {
      fadeElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if (elementPosition < screenPosition) {
          element.classList.add('active');
        }
      });
    };

    // Add IntersectionObserver for better performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1
    });

    fadeElements.forEach(element => {
      observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Header animation effect
  useEffect(() => {
    const animateHeader = () => {
      if (headerTitleRef.current && headerSubtitleRef.current) {
        // Reset animations
        headerTitleRef.current.style.animation = 'none';
        headerSubtitleRef.current.style.animation = 'none';
        
        // Force reflow
        void headerTitleRef.current.offsetWidth;
        
        // Apply animations
        headerTitleRef.current.style.animation = 'titleGlow 3s ease-in-out';
        headerSubtitleRef.current.style.animation = 'subtitlePulse 2s ease-in-out';
      }
    };

    // Initial animation
    const timer = setTimeout(() => {
      animateHeader();
    }, 2000);

    // Repeat animation every 8 seconds
    const intervalId = setInterval(animateHeader, 8000);

    return () => {
      clearTimeout(timer);
      clearInterval(intervalId);
    };
  }, []);

  const exteriorServices = [
    { service: "Обычная мойка автомобиля", price: "900 – 1 300" },
    { service: "Глубокая мойка (с предварительной обработкой)", price: "1 800 – 2 700" },
    { service: "Полировка фар", price: "1 300 – 2 500" },
    { service: "Многоступенчатая полировка кузова", price: "3 500 – 7 000" },
    { service: "Нанесение воска", price: "1 800 – 3 500" },
    { service: "Нанесение гидрофоба", price: "2 200 – 4 000" },
    { service: "Керамическое покрытие (один слой)", price: "9 000 – 18 000" },
    { service: "Керамическое покрытие (многослойное)", price: "18 000 – 27 000" },
    { service: "Удаление битума и дегтя", price: "900 – 1 800" },
    { service: "Удаление оксидного слоя", price: "2 700 – 4 500" },
    { service: "Мойка двигателя", price: "1 800 – 3 500" },
    { service: "Уход за дисками (чистка + защита)", price: "1 300 – 2 500" },
    { service: "Уход за стеклами (полировка + гидрофоб)", price: "900 – 1 800" },
    { service: "Тонировка фар / задних фонарей", price: "1 800 – 4 500" },
    { service: "Уход за хромированными элементами", price: "900 – 1 800" },
    { service: "Защитная плёнка PPF на капот / зеркала", price: "от 2 700 руб" },
    { service: "Антикоррозийная обработка порогов / арок", price: "1 800 – 4 500" }
  ];

  const interiorServices = [
    { service: "Сухая уборка (пылесос, протирка поверхностей)", price: "900 – 1 300" },
    { service: "Химчистка салона (ткань/кожа)", price: "2 700 – 5 500" },
    { service: "Химчистка потолка (замша/алькантара)", price: "1 300 – 2 500" },
    { service: "Чистка пластиковых деталей", price: "900 – 1 800" },
    { service: "Кондиционирование кожи", price: "1 800 – 3 500" },
    { service: "Уход за светлыми сиденьями (отбеливание)", price: "2 200 – 4 500" },
    { service: "Уход за деревянными вставками", price: "900 – 1 800" },
    { service: "Чистка кондиционера (испаритель + воздуховоды)", price: "1 800 – 2 700" },
    { service: "Восстановление цвета черного пластика", price: "900 – 2 500" },
    { service: "Уход за рулем и рычагом КПП", price: "900 – 1 800" },
    { service: "Удаление запаха табака / еды / животных", price: "1 800 – 3 500" }
  ];

  const additionalServices = [
    { service: "Выездной детейлинг (до 10 км от студии)", price: "+10–20%" },
    { service: "Диагностика состояния ЛКП (толщиномер)", price: "Бесплатно / 450 руб" },
    { service: "Антидождь на стёкла (передние + боковые)", price: "1 300 – 2 200" },
    { service: "Установка светодиодов в салон", price: "900 – 2 500" },
    { service: "Нанесение графита на замки дверей", price: "450 – 900" },
    { service: "Установка силиконовых заглушек на решётки", price: "450 – 900" },
    { service: "Установка подсветки в багажник", price: "900 – 1 800" },
    { service: "Установка органайзеров в двери", price: "900 – 1 800" }
  ];

  return (
    <div className="font-roboto text-white bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-center flex-wrap gap-2 md:gap-0">
          <a href="#services" className="text-white hover:text-cyan-400 transition-colors mx-2 md:mx-4">Услуги</a>
          <a href="#prices" className="text-white hover:text-cyan-400 transition-colors mx-2 md:mx-4">Цены</a>
          <a href="#gallery" className="text-white hover:text-cyan-400 transition-colors mx-2 md:mx-4">Галерея</a>
          <a href="#contact" className="text-white hover:text-cyan-400 transition-colors mx-2 md:mx-4">Контакты</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header 
        className="relative h-screen flex items-center justify-center text-center flex-col overflow-hidden"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1619019058440-fb2f6a48d9c3?auto=format&fit=crop&w=1950&q=80')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
        aria-label="Чистый автомобиль на фоне детейлинг-студии"
      >
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 max-w-3xl px-4">
          <h1 
            ref={headerTitleRef}
            className="header-title text-4xl sm:text-5xl md:text-6xl font-playfair font-bold mb-6 bg-black/60 p-6 sm:p-8 rounded-lg shadow-lg text-cyan-400 border border-cyan-500/30 transform transition-all duration-1000 opacity-0 translate-y-8"
          >
            Профессиональный детейлинг вашего автомобиля
          </h1>
          <p 
            ref={headerSubtitleRef}
            className="header-subtitle text-lg sm:text-xl md:text-2xl bg-black/60 p-3 sm:p-4 rounded-lg shadow-md transform transition-all duration-1000 opacity-0 translate-y-8 delay-500"
          >
            Вернем блеск вашему авто с любовью и заботой
          </p>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="fade-in py-16 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400">Наши услуги</h2>
          
          <div id="prices" className="tabs flex flex-wrap justify-center gap-2 mb-8 bg-gray-800 p-2 sm:p-3 rounded-lg">
            <button 
              onClick={() => setActiveTab('exterior')} 
              className={`tab-link px-4 py-1 sm:px-6 sm:py-2 rounded-md transition-all ${activeTab === 'exterior' ? 'bg-cyan-400 text-black font-bold' : 'hover:bg-gray-700'}`}
            >
              Экстерьер
            </button>
            <button 
              onClick={() => setActiveTab('interior')} 
              className={`tab-link px-4 py-1 sm:px-6 sm:py-2 rounded-md transition-all ${activeTab === 'interior' ? 'bg-cyan-400 text-black font-bold' : 'hover:bg-gray-700'}`}
            >
              Интерьер
            </button>
            <button 
              onClick={() => setActiveTab('additional')} 
              className={`tab-link px-4 py-1 sm:px-6 sm:py-2 rounded-md transition-all ${activeTab === 'additional' ? 'bg-cyan-400 text-black font-bold' : 'hover:bg-gray-700'}`}
            >
              Дополнительно
            </button>
          </div>

          {/* Tab Contents */}
          <div className="tab-contents">
            {/* Exterior Tab Content */}
            {activeTab === 'exterior' && (
              <div className="tab-content bg-gray-900/70 rounded-lg p-4 sm:p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">Экстерьерные услуги</h3>
                <div className="overflow-x-auto">
                  <table className="price-table w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="text-left p-3 border-b border-gray-700">Услуга</th>
                        <th className="text-left p-3 border-b border-gray-700">Цена (руб)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exteriorServices.map((service, index) => (
                        <tr key={`exterior-${index}`} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                          <td className="p-3">{service.service}</td>
                          <td className="p-3 whitespace-nowrap">{service.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Interior Tab Content */}
            {activeTab === 'interior' && (
              <div className="tab-content bg-gray-900/70 rounded-lg p-4 sm:p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">Интерьерные услуги</h3>
                <div className="overflow-x-auto">
                  <table className="price-table w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="text-left p-3 border-b border-gray-700">Услуга</th>
                        <th className="text-left p-3 border-b border-gray-700">Цена (руб)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {interiorServices.map((service, index) => (
                        <tr key={`interior-${index}`} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                          <td className="p-3">{service.service}</td>
                          <td className="p-3 whitespace-nowrap">{service.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Additional Tab Content */}
            {activeTab === 'additional' && (
              <div className="tab-content bg-gray-900/70 rounded-lg p-4 sm:p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">Дополнительные услуги</h3>
                <div className="overflow-x-auto">
                  <table className="price-table w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="text-left p-3 border-b border-gray-700">Услуга</th>
                        <th className="text-left p-3 border-b border-gray-700">Цена (руб)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {additionalServices.map((service, index) => (
                        <tr key={`additional-${index}`} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                          <td className="p-3">{service.service}</td>
                          <td className="p-3 whitespace-nowrap">{service.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="fade-in py-16 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400 font-playfair">Наши работы</h2>
          <div className="gallery-container">
            <div className="image-gallery flex overflow-x-auto pb-4 -mx-2 scrollbar-hide">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={`gallery-${i}`} className="gallery-item min-w-[280px] md:min-w-[320px] h-64 mx-2 rounded-lg overflow-hidden relative group flex-shrink-0 transition-transform duration-300 hover:scale-105">
                  <img 
                    src={`https://picsum.photos/id/${i * 10}/600/400`} 
                    alt={`Пример работ по детейлингу ${i}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="gallery-caption absolute bottom-0 left-0 right-0 bg-black/70 p-3 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                    Работа #{i}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="fade-in py-16 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400">Контакты</h2>
          <div className="bg-gray-900/70 rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <p className="mb-4">📍 Адрес: г. Москва, ул. Автомобильная, д. 15</p>
              <p className="mb-4">📞 Телефон: <a href="tel:+79991234567" className="hover:text-cyan-400 transition-colors">+7 (999) 123-45-67</a></p>
              <p className="mb-4">📧 Email: <a href="mailto:info@detailingstudio.ru" className="hover:text-cyan-400 transition-colors">info@detailingstudio.ru</a></p>
              <p>© 2025 Детейлинг-студия "БлескАвто"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-center py-6">
        <p>&copy; 2025 Детейлинг-студия "БлескАвто"</p>
      </footer>

      {/* Add custom animations to global styles */}
      <style jsx global>{`
        @keyframes titleGlow {
          0% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.2); text-shadow: 0 0 10px rgba(0, 255, 255, 0.3); }
          50% { box-shadow: 0 0 30px rgba(0, 255, 255, 0.4); text-shadow: 0 0 15px rgba(0, 255, 255, 0.5); }
          100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.2); text-shadow: 0 0 10px rgba(0, 255, 255, 0.3); }
        }
        @keyframes subtitlePulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 15px rgba(0, 255, 255, 0.1); }
          50% { transform: scale(1.02); box-shadow: 0 0 20px rgba(0, 255, 255, 0.2); }
        }
        .header-title {
          animation: titleGlow 3s ease-in-out;
        }
        .header-subtitle {
          animation: subtitlePulse 2s ease-in-out;
        }
        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s ease-out;
        }
        .fade-in.active {
          opacity: 1;
          transform: translateY(0);
        }
        .price-table th, .price-table td {
          border: 1px solid #444;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (max-width: 768px) {
          .header-title {
            font-size: 2.5rem;
            padding: 1.5rem;
          }
          .header-subtitle {
            font-size: 1.2rem;
          }
        }
        @media (max-width: 480px) {
          .header-title {
            font-size: 2rem;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}