import React, { useState, useRef } from 'react';
import styles from './ReviewPage.module.css';
import { FiUpload, FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';

const logoImg = "/logo-backBlack-horizontal.png";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

const mockRestaurants = [
  { id: "1", name: "Restaurante Bella Vista" },
  { id: "2", name: "Café Central" },
  { id: "3", name: "Trattoria Italiana" },
  { id: "4", name: "Sushi House" },
  { id: "5", name: "Burger King" },
];

const mockPratos = [
  { id: "1", name: "Risotto de Camarão" },
  { id: "2", name: "Carbonara" },
  { id: "3", name: "Sushi Combo" },
  { id: "4", name: "Hambúrguer Artesanal" },
  { id: "5", name: "Pizza Margherita" },
];

const ReviewPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'review' | 'list'>('review');
  
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [selectedPrato, setSelectedPrato] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [listName, setListName] = useState('');
  const [listDescription, setListDescription] = useState('');
  const [listCoverImage, setListCoverImage] = useState<UploadedImage | null>(null);
  const [listItems, setListItems] = useState<Array<{ id: string; name: string; type: 'restaurant' | 'prato' }>>([]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemType, setNewItemType] = useState<'restaurant' | 'prato'>('restaurant');
  const listCoverInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const preview = e.target?.result as string;
          const newImage: UploadedImage = {
            id: Date.now().toString() + Math.random(),
            file,
            preview,
          };
          setUploadedImages((prev) => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleRemoveImage = (id: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleListCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      setListCoverImage({
        id: Date.now().toString(),
        file,
        preview,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleAddListItem = () => {
    if (newItemName.trim()) {
      setListItems((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          name: newItemName,
          type: newItemType,
        },
      ]);
      setNewItemName('');
      setShowAddItem(false);
    }
  };

  const handleRemoveListItem = (id: string) => {
    setListItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      

      console.log('Avaliação salva:', {
        restaurant: selectedRestaurant,
        prato: selectedPrato,
        rating,
        reviewText,
        visitDate,
        images: uploadedImages,
      });

      setSubmitMessage({ type: 'success', text: 'Avaliação publicada com sucesso!' });
      
      setTimeout(() => {
        setSelectedRestaurant('');
        setSelectedPrato('');
        setRating(0);
        setReviewText('');
        setVisitDate('');
        setUploadedImages([]);
        setSubmitMessage(null);
      }, 2000);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Erro ao publicar avaliação. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitList = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      

      console.log('Lista criada:', {
        name: listName,
        description: listDescription,
        coverImage: listCoverImage,
        items: listItems,
      });

      setSubmitMessage({ type: 'success', text: 'Lista criada com sucesso!' });
      
      setTimeout(() => {
        setListName('');
        setListDescription('');
        setListCoverImage(null);
        setListItems([]);
        setSubmitMessage(null);
      }, 2000);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Erro ao criar lista. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.headerLogo}>
        <img src={logoImg} alt="Food Boxd" className={styles.logoImage} />
      </header>

      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tab} ${activeTab === 'review' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('review')}
        >
          Nova Avaliação
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'list' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('list')}
        >
          Criar Lista
        </button>
      </div>

      <div className={styles.contentContainer}>
        {activeTab === 'review' ? (
          <form onSubmit={handleSubmitReview} className={styles.form}>
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Detalhes da Avaliação</h2>
              
              <div className={styles.inputGroup}>
                <label className={styles.label}>Restaurante *</label>
                <select
                  className={styles.select}
                  value={selectedRestaurant}
                  onChange={(e) => setSelectedRestaurant(e.target.value)}
                  required
                >
                  <option value="">Selecione um restaurante</option>
                  {mockRestaurants.map((rest) => (
                    <option key={rest.id} value={rest.id}>
                      {rest.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Prato *</label>
                <select
                  className={styles.select}
                  value={selectedPrato}
                  onChange={(e) => setSelectedPrato(e.target.value)}
                  required
                >
                  <option value="">Selecione um prato</option>
                  {mockPratos.map((prato) => (
                    <option key={prato.id} value={prato.id}>
                      {prato.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Data da Visita *</label>
                <input
                  type="date"
                  className={styles.input}
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Avaliação *</label>
                <div className={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`${styles.starButton} ${star <= rating ? styles.starActive : ''}`}
                      onClick={() => setRating(star)}
                    >
                      {star <= rating ? <FaStar /> : <FaRegStar />}
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className={styles.ratingText}>{rating} estrela{rating > 1 ? 's' : ''}</span>
                  )}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Sua Experiência</label>
                <textarea
                  className={styles.textarea}
                  rows={6}
                  placeholder="Conte-nos sobre sua experiência... O que achou do prato? Como estava o ambiente? Recomendaria?"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <span className={styles.charCount}>{reviewText.length} / 1000 caracteres</span>
              </div>
            </div>

            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Fotos</h2>
              <div className={styles.uploadSection}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className={styles.fileInput}
                />
                <button
                  type="button"
                  className={styles.uploadButton}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FiUpload />
                  Adicionar Fotos
                </button>
                <p className={styles.uploadHint}>Você pode adicionar até 10 fotos</p>
              </div>

              {uploadedImages.length > 0 && (
                <div className={styles.imagesGrid}>
                  {uploadedImages.map((img) => (
                    <div key={img.id} className={styles.imagePreview}>
                      <img src={img.preview} alt="Preview" />
                      <button
                        type="button"
                        className={styles.removeImageButton}
                        onClick={() => handleRemoveImage(img.id)}
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {submitMessage && (
              <div className={`${styles.message} ${submitMessage.type === 'success' ? styles.messageSuccess : styles.messageError}`}>
                {submitMessage.text}
              </div>
            )}
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Publicando...' : 'Publicar Avaliação'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmitList} className={styles.form}>
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Informações da Lista</h2>
              
              <div className={styles.inputGroup}>
                <label className={styles.label}>Nome da Lista *</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Ex: Melhores Restaurantes de Salvador"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  required
                  maxLength={100}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Descrição</label>
                <textarea
                  className={styles.textarea}
                  rows={4}
                  placeholder="Descreva sua lista... O que ela representa? Por que você criou?"
                  value={listDescription}
                  onChange={(e) => setListDescription(e.target.value)}
                  maxLength={500}
                />
                <span className={styles.charCount}>{listDescription.length} / 500 caracteres</span>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Imagem de Capa</label>
                <div className={styles.coverUploadSection}>
                  <input
                    ref={listCoverInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleListCoverUpload}
                    className={styles.fileInput}
                  />
                  {listCoverImage ? (
                    <div className={styles.coverPreview}>
                      <img src={listCoverImage.preview} alt="Capa" />
                      <button
                        type="button"
                        className={styles.changeCoverButton}
                        onClick={() => listCoverInputRef.current?.click()}
                      >
                        Alterar
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className={styles.uploadCoverButton}
                      onClick={() => listCoverInputRef.current?.click()}
                    >
                      <FiUpload />
                      Adicionar Imagem de Capa
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Itens da Lista</h2>
              
              {listItems.length > 0 && (
                <div className={styles.listItemsContainer}>
                  {listItems.map((item) => (
                    <div key={item.id} className={styles.listItem}>
                      <span className={styles.itemType}>{item.type === 'restaurant' ? '🍽️' : '🍕'}</span>
                      <span className={styles.itemName}>{item.name}</span>
                      <button
                        type="button"
                        className={styles.removeItemButton}
                        onClick={() => handleRemoveListItem(item.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {showAddItem ? (
                <div className={styles.addItemForm}>
                  <select
                    className={styles.select}
                    value={newItemType}
                    onChange={(e) => setNewItemType(e.target.value as 'restaurant' | 'prato')}
                  >
                    <option value="restaurant">Restaurante</option>
                    <option value="prato">Prato</option>
                  </select>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Nome do item"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                  />
                  <button
                    type="button"
                    className={styles.addButton}
                    onClick={handleAddListItem}
                  >
                    <FiPlus />
                  </button>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={() => {
                      setShowAddItem(false);
                      setNewItemName('');
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className={styles.addItemButton}
                  onClick={() => setShowAddItem(true)}
                >
                  <FiPlus />
                  Adicionar Item
                </button>
              )}
            </div>

            {submitMessage && (
              <div className={`${styles.message} ${submitMessage.type === 'success' ? styles.messageSuccess : styles.messageError}`}>
                {submitMessage.text}
              </div>
            )}
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Criando...' : 'Criar Lista'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;

