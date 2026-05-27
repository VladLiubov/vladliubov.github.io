export const CV = {
  name: 'Vladyslav Liubov',
  role: 'iOS Developer',
  location: 'Porto, Portugal',
  phone: '+351 921 133 346',
  email: 'vladliubov22@gmail.com',
  linkedin: 'https://linkedin.com/in/vladyslav-liubov',
  github: 'https://github.com/vladliubov',
  languages: ['Ukrainian (native)', 'English'],
  profile:
    'Developer with three years of experience in developing and supporting applications. Skilled in maintaining live apps, fixing bugs, and adding new features to enhance functionality and user experience. Committed to writing clean code and ensuring apps run smoothly.',
  experience: [
    {
      role: 'iOS Developer',
      company: 'RIA.com',
      city: 'Kyiv',
      period: 'January 2023 — present',
      bullets: [
        'Rewrote legacy UIKit screens to modern SwiftUI equivalents for improved maintainability',
        'Fixed critical bugs and optimized performance for SwiftUI and UIKit components',
        'Supported internal packages with Swift Package Manager and CocoaPods',
        'Camera functionality for video recording and photo capturing with AVFoundation',
        'Collaborated with backend teams using REST, Apollo, Moya',
      ],
    },
    {
      role: 'iOS Developer',
      company: 'CML Team LTD',
      city: 'Kyiv',
      period: 'April 2022 — January 2023',
      bullets: [
        'Using SwiftUI, UIKit and Combine developed applications from scratch: authorisation, search engine, scanning, audio recording, speech recognition, integration with Trello',
        'Solid experience with Realm database solution',
        'Worked with MapBox: maps and navigation',
        'Actively interacted with back-end databases (Firebase, Swagger)',
        'Worked with repositories: GitHub, GitLab, Bitbucket',
        'Completed several orders on Upwork',
        'Experience with Objective-C',
      ],
    },
    {
      role: 'Head Tutor',
      company: 'NewTone alternative school',
      city: 'Kyiv',
      period: '2016 — 2022',
      bullets: [
        'Coordinated students of the 5th grade (2018–2019), all grades (2019–2022)',
        'Supported online education and distance learning',
        'Organized and managed school events and trips',
        'Teacher of logics, chess, science and drama class',
      ],
    },
    {
      role: 'Camp Leader',
      company: 'Space Camp educational camp',
      city: '',
      period: '2019',
      bullets: ['Team building, camp program development, team training'],
    },
  ],
  skills: [
    {
      category: 'Languages & Frameworks',
      items: ['Swift', 'SwiftUI', 'UIKit', 'Objective-C', 'Combine', 'RxSwift', 'Cocoa Touch'],
    },
    {
      category: 'Tools',
      items: ['Xcode', 'Git', 'CocoaPods', 'SPM'],
    },
    {
      category: 'Databases',
      items: ['Realm', 'Firebase', 'Core Data'],
    },
    {
      category: 'APIs & Services',
      items: ['REST', 'GraphQL', 'Apollo', 'Moya'],
    },
    {
      category: 'Design',
      items: ['Figma', 'Miro'],
    },
  ],
  education: [
    {
      degree: 'Bachelor in Physical Rehabilitation',
      institution: 'National Technical University of Ukraine "KPI", Faculty of Bioengineering',
      period: '2014 — 2018',
    },
  ],
  courses: [
    {
      name: 'iOS Development',
      institution: 'Web Academy',
      period: 'October 2021 — December 2021',
    },
  ],
} as const
