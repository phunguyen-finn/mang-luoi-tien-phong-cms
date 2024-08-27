# Mang luoi Tien phong CMS Client Application

<p align="center">
<a href="https://www.npmjs.com/package/react"><img src="https://img.shields.io/badge/React-18.0-blue.svg" alt="React"></a>
<a href="https://nodejs.org/en"><img src="https://img.shields.io/badge/Node-20.17-green.svg" alt="Node 20.17.5"></a>
<a href="https://www.firebase.google.com"><img src="https://img.shields.io/badge/firebase-latest-yellow.svg" alt="Firebase"></a>
<a href="https://www.npmjs.com/package/antd"><img src="https://img.shields.io/badge/antd-4.24-red.svg" alt="Ant design"></a>
</p>


This repo holds the source code for Mang luoi Tien phong's CMS application, written using [React](https://www.npmjs.com/package/react).

Latest revision: Aug 22nd, 2024.

Please contact [Phu Nguyen](https://fb.com/nnphongphu) for further inquiry.

## Infrastructure
All infrastructures for hosting this web application are provided by the following cloud providers:
1. Hosting: [Firbase static hosting](https://firebase.google.com)
2. Database: [Firestore](https://firebase.google.com)
3. Storage: [Cloud storage for Firebase](https://firebase.google.com)
4. Authentication: [Firebase authentication](https://firebase.google.com)

For involved parties & maintainers, please contact me to get console access to these services.

## Development
1. First, install the dependencies:

```bash
npm install
```

2. Configure environment variables:

Create an `.env` file in the root folder, and copy the content of `.env.sample` into that file. You can create your own Firebase project to get your own key. If if you need access to production's key, contact me.

3. Run the server:
```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

