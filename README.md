# 📚 Histoires pour Enfants

Une application mobile cross-platform (iOS, Android, Web) qui permet aux enfants d'écouter et de lire de courtes histoires en français.

## ✨ Fonctionnalités

- 📖 **Collection d'histoires** : 5 histoires courtes et amusantes pour enfants
- 🔊 **Lecture audio automatique** : Text-to-Speech en français avec une voix adaptée aux enfants
- 📱 **Navigation intuitive** : Appuyez pour tourner les pages
- 🎨 **Interface colorée** : Design joyeux et adapté aux enfants
- ⏸️ **Contrôles simples** : Lecture, pause, navigation avant/arrière
- 🌍 **Cross-platform** : Fonctionne sur iOS, Android et Web

## 🎯 Histoires disponibles

1. **Le Petit Nuage Aventurier** (3-5 ans) - Un nuage qui découvre le monde
2. **La Petite Étoile Timide** (4-6 ans) - Une étoile qui apprend à briller
3. **Le Jardin Magique de Léon** (5-7 ans) - Un garçon découvre un jardin extraordinaire
4. **Le Dragon qui Avait Peur du Feu** (4-7 ans) - Un dragon différent qui trouve sa force
5. **La Baleine Chanteuse** (3-6 ans) - Une baleine qui rêve de devenir chanteuse

## 🚀 Installation

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn
- Expo CLI (sera installé automatiquement)

### Étapes d'installation

1. Cloner le repository :
```bash
git clone <url-du-repo>
cd Histoires-pour-enfants-
```

2. Installer les dépendances :
```bash
npm install
# ou
yarn install
```

3. Lancer l'application :
```bash
npm start
# ou
yarn start
```

## 📱 Tester l'application

### Sur un appareil physique

1. Installez l'application **Expo Go** sur votre téléphone :
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Android - Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scannez le QR code affiché dans le terminal avec :
   - iOS : l'application Appareil photo
   - Android : l'application Expo Go

### Sur un émulateur

```bash
# Pour Android
npm run android

# Pour iOS (Mac uniquement)
npm run ios

# Pour le Web
npm run web
```

## 🎨 Structure du projet

```
Histoires-pour-enfants-/
├── App.tsx                      # Point d'entrée principal avec navigation
├── src/
│   ├── screens/
│   │   ├── StoryListScreen.tsx  # Écran de sélection des histoires
│   │   └── StoryReaderScreen.tsx # Lecteur d'histoires avec TTS
│   ├── types/
│   │   └── Story.ts             # Types TypeScript
│   └── data/
│       └── stories.ts           # Données des histoires
├── assets/                      # Images et icônes
└── package.json
```

## ➕ Ajouter de nouvelles histoires

Pour ajouter une nouvelle histoire, éditez le fichier `src/data/stories.ts` :

```typescript
{
  id: '6',
  title: 'Titre de l\'histoire',
  description: 'Description courte',
  ageRange: '3-6 ans',
  readingTime: 4,
  pages: [
    {
      id: 1,
      text: "Texte de la première page..."
    },
    {
      id: 2,
      text: "Texte de la deuxième page..."
    }
    // ... ajoutez autant de pages que nécessaire
  ]
}
```

## 🎤 Text-to-Speech

L'application utilise `expo-speech` pour la lecture automatique des histoires en français :
- **Langue** : Français (fr-FR)
- **Pitch** : 1.1 (voix légèrement plus aiguë, amicale)
- **Rate** : 0.85 (vitesse ralentie pour faciliter la compréhension)
- **Mode auto** : Tourne automatiquement les pages après la lecture

## 🛠️ Technologies utilisées

- **React Native** : Framework mobile cross-platform
- **Expo** : Plateforme de développement pour React Native
- **TypeScript** : Typage statique
- **React Navigation** : Navigation entre écrans
- **Expo Speech** : Text-to-Speech intégré

## 📝 Prochaines fonctionnalités possibles

- [ ] Ajout d'illustrations pour chaque page
- [ ] Favoris et historique de lecture
- [ ] Mode nuit
- [ ] Choix de la voix (masculine/féminine)
- [ ] Catégories d'histoires (aventure, animaux, contes, etc.)
- [ ] Animations de transition entre pages
- [ ] Possibilité de créer ses propres histoires

## 📄 Licence

Ce projet est sous licence MIT.

## 👨‍💻 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Ajouter de nouvelles histoires
- Améliorer l'interface
- Corriger des bugs
- Proposer de nouvelles fonctionnalités

---

Fait avec ❤️ pour les enfants
