import React, { useState } from 'react';
import type { BusinessType } from '../../types';
import { fetchNui } from '../../utils/fetchNui';
import styles from './CreateRequest.module.css';

const TYPES: { value: BusinessType; label: string }[] = [
  { value: 'bar', label: 'Bar' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'station', label: 'Station-service' },
  { value: 'concession', label: 'Concession' },
  { value: 'club', label: 'Club' },
  { value: 'garage', label: 'Garage' },
  { value: 'autre', label: 'Autre' },
];

export default function CreateRequest({
  pushToast,
  onSuccess,
}: {
  pushToast: any;
  onSuccess: () => void;
}) {
  const [name, setName] = useState('');
  const [type, setType] = useState<BusinessType>('bar');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [revenueEstimate, setRevenueEstimate] = useState('');
  const [attachments, setAttachments] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !location.trim() || !description.trim() || !budget.trim()) {
      pushToast({
        title: 'Erreur',
        message: 'Veuillez remplir tous les champs obligatoires.',
        variant: 'error',
      });
      return;
    }

    const budgetNum = parseInt(budget.replace(/\s/g, ''), 10);
    const revenueNum = revenueEstimate ? parseInt(revenueEstimate.replace(/\s/g, ''), 10) : undefined;

    if (isNaN(budgetNum) || budgetNum <= 0) {
      pushToast({
        title: 'Erreur',
        message: 'Le budget doit être un nombre valide supérieur à 0.',
        variant: 'error',
      });
      return;
    }

    if (revenueEstimate && (isNaN(revenueNum!) || revenueNum! <= 0)) {
      pushToast({
        title: 'Erreur',
        message: 'Le revenu estimé doit être un nombre valide supérieur à 0.',
        variant: 'error',
      });
      return;
    }

    setSubmitting(true);
    try {
      const result = await fetchNui<{ success: boolean; message?: string }>(
        'createRequest',
        {
          name: name.trim(),
          type,
          location: location.trim(),
          description: description.trim(),
          budget: budgetNum,
          revenueEstimate: revenueNum,
          attachments: attachments.trim() || undefined,
        },
        { success: true }
      );

      if (result?.success) {
        pushToast({
          title: 'Succès',
          message: 'Votre demande a été créée avec succès.',
          variant: 'success',
        });
        // Reset form
        setName('');
        setLocation('');
        setDescription('');
        setBudget('');
        setRevenueEstimate('');
        setAttachments('');
        onSuccess();
      } else {
        pushToast({
          title: 'Erreur',
          message: result?.message || 'Une erreur est survenue lors de la création de la demande.',
          variant: 'error',
        });
      }
    } catch (error) {
      pushToast({
        title: 'Erreur',
        message: 'Une erreur est survenue lors de la création de la demande.',
        variant: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <div>
          <div className={styles.h1}>➕ Créer une demande</div>
          <div className={styles.h2}>
            Soumettez une demande pour créer une nouvelle entreprise.
          </div>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.section}>
          <label className={styles.label}>
            Nom de l'entreprise <span className={styles.required}>*</span>
          </label>
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Le Gold Bar"
            required
          />
        </div>

        <div className={styles.row}>
          <div className={styles.section}>
            <label className={styles.label}>
              Type <span className={styles.required}>*</span>
            </label>
            <select
              className={styles.select}
              value={type}
              onChange={(e) => setType(e.target.value as BusinessType)}
              required
            >
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.section}>
            <label className={styles.label}>
              Localisation <span className={styles.required}>*</span>
            </label>
            <input
              className={styles.input}
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: Vinewood Blvd"
              required
            />
          </div>
        </div>

        <div className={styles.section}>
          <label className={styles.label}>
            Description <span className={styles.required}>*</span>
          </label>
          <textarea
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez votre projet d'entreprise..."
            rows={4}
            required
          />
        </div>

        <div className={styles.row}>
          <div className={styles.section}>
            <label className={styles.label}>
              Budget (en $) <span className={styles.required}>*</span>
            </label>
            <input
              className={styles.input}
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value.replace(/\D/g, ''))}
              placeholder="200000"
              required
            />
          </div>

          <div className={styles.section}>
            <label className={styles.label}>Revenu estimé (en $)</label>
            <input
              className={styles.input}
              type="text"
              value={revenueEstimate}
              onChange={(e) => setRevenueEstimate(e.target.value.replace(/\D/g, ''))}
              placeholder="35000 (optionnel)"
            />
          </div>
        </div>

        <div className={styles.section}>
          <label className={styles.label}>Pièces jointes (URL)</label>
          <input
            className={styles.input}
            type="url"
            value={attachments}
            onChange={(e) => setAttachments(e.target.value)}
            placeholder="https://example.com/image.png (optionnel)"
          />
        </div>

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.submit}
            disabled={submitting}
          >
            {submitting ? 'Envoi en cours...' : 'Soumettre la demande'}
          </button>
        </div>
      </form>
    </div>
  );
}
