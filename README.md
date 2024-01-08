
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h1 align="center">TEA Culture</h1>

  <p align="center">
    Connecting and educating tea and cafe drink enthusiasts!
    <br />
    <a href="https://teaculture.onrender.com/">View WebPage</a>
    ·
    <a href="https://github.com/tianalopez/teaculture/issues">Report Bug</a>
    ·
    <a href="https://github.com/tianalopez/teaculture/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started & Installation</a>
      <ul>
        <li><a href="#fork-and-clone-the-repo">Fork & Clone the Repo</a></li>
        <li><a href="#server/">server/</a></li>
        <li><a href="#client/">client/</a></li>
      </ul>
    </li>
    <li><a href="#environment-variables">Environment Variables</a>
      <ul>
        <li><a href="#.env-file">.env file</a></li>
        <li><a href="#Google-OAuth-Client-ID">Google OAuth Client ID/</a></li>
        <li><a href="#JWT-Secret-Key">JWT Secret Key</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<div align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjA2cW9lNGVlcjRjOHRyanE5aG9uYXZjeTBldW84aHJzN3h2Njl4ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L4PJMmtFN5mhuURnYU/giphy.gif" alt="Product GIF"
  width="800">
</div>

Teaculture is a unique platform designed for health-conscious individuals who seek not only the medicinal benefits of teas but also a creative and enjoyable space for experimenting with unique drink recipes. This React-Flask application combines the power of React JSX on the frontend with Flask and SQLAlchemy on the backend to create an immersive and educational experience for tea and cafe drink enthusiasts.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![React][React.js]][React-url]
* [![Flask][Flask.pallets]][Flask-url]
* [![SQLAlchemy][SQLAlchemy]][SQLAlchemy-url]
* [![Material-UI][MUI]][MUI-url]
* [![Formik][Formik]][Formik-url]
* [![Yup][Yup]][Yup-url]
* [![Google Auth][Google-Auth]][Google-Auth-url]
* [![JWT][JWT]][JWT-url]
* [![Marshmallow][Marshmallow]][Marshmallow-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started & Installation

Follow these steps to set up and run Teaculture locally.

### Fork and clone the repo
Check out Github's instructions for forking and cloning a repo [here](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).

### server/

The project contains a `Pipfile` with dependecies you will need to run the application.
To download dependencies for the backend server, run:
```
  pipenv install
  pipenv shell
```
You can run your Flask API on localhost:555 by running:
```
  python server/app.py
```
Check that your server serves the default route `http://localhost:5555`. You should see the webpage appear when the app runs.

### client/
The `package.json` file has been configured with the React application dependencies.

First, make sure you have the following tools installed:

* [Node.js and npm](https://nodejs.org/) - We recommend using the latest version.
```sh
  npm install npm@latest -g
```

To download the dependencies for the frontend client, run:
```
  npm install --prefix client
```
You can run your React app on `localhost:3000` by running:
```
  npm start --prefix client
```

## Environment Variables
### .env file
You will need to create a .env file where you will need to specify the following variables:

```
  PIPENV_IGNORE_VIRTUALENVS = 1
  FLASK_APP=app.py
  FLASK_RUN_PORT=5555
```

### Google OAuth Client ID
To use the Google OAuth sign in feature. You will need to visit Google Cloud Console, create an account, and generate an OAuth Client ID. Google provides a fairly comprehensive guide, but you can also find more information [here](https://tianalopez.hashnode.dev/beginners-guide-to-google-oauth-with-react-and-flask).

After you get a Client ID, you will need to add it to your `.env` file like this:
```
  GOOGLE_CLIENT_ID='whateverkeyyougenerate'
```
This key will also need to be accessed by the frontend. Since you are using a React App, you need to define this variable like so:
```
  REACT_APP_GOOGLE_CLIENT_ID='whateverkeyyougenerate'
```

### JWT Secret Key
You will also need to add a `JWT_SECRET_KEY` variable to your `.env` file. This can be generated using the following commands in the python terminal:
```python
  import secrets
  import hashlib

  # generate a random hex string
  random_hex = secrets.token(32)

  # Create a SHA-256 hash
  hashed_key = hashlib.sha256(random_hex.encode()).hexdigest()
```
Then use the `hashed_key` inside your `.env` file.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Tiana Lopez - [LinkedIn](https://www.linkedin.com/in/tiana-lopez-728863180/) - lopez.y.tiana@gmail.com

Project Link: [https://github.com/tianalopez/teaculture](https://github.com/tianalopez/teaculture)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
* [Choose an Open Source License](https://choosealicense.com)
* [Google OAuth Blog](https://tianalopez.hashnode.dev/beginners-guide-to-google-oauth-with-react-and-flask)
* [Tea API](https://github.com/boonaki/boonakis-tea-api)
* [Quote API](https://github.com/lukePeavey/quotable)
* [Google OAuth Youtube Guide](https://www.youtube.com/watch?v=roxC8SMs7HU&t=0s)
* [Dribble](https://dribbble.com/shots/6307314-Green-Tea)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/tiana-lopez-728863180/
[React.js]: https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white
[React-url]: https://reactjs.org/
[Flask.pallets]: https://img.shields.io/badge/Flask-3.8.13-000000?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://palletsprojects.com/p/flask/
[SQLAlchemy]: https://img.shields.io/badge/SQLAlchemy-3.0.3-red?style=for-the-badge&logo=sqlalchemy&logoColor=white
[SQLAlchemy-url]: https://www.sqlalchemy.org/
[MUI]: https://img.shields.io/badge/Material--UI-5.14.18-0081CB?style=for-the-badge&logo=material-ui&logoColor=white
[MUI-url]: https://mui.com/
[Formik]: https://img.shields.io/badge/Formik-2.4.5-61DAFB?style=for-the-badge&logo=formik&logoColor=white
[Formik-url]: https://formik.org/
[Yup]: https://img.shields.io/badge/Yup-1.3.2-2C5BB4?style=for-the-badge&logo=yup&logoColor=white
[Yup-url]: https://github.com/jquense/yup
[Google-Auth]: https://img.shields.io/badge/Google%20Auth-1.2.0-4285F4?style=for-the-badge&logo=google&logoColor=white
[Google-Auth-url]: https://google-auth-url.com
[JWT]: https://img.shields.io/badge/JWT-1.2.0-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white
[JWT-url]: https://jwt.io/
[Marshmallow]: https://img.shields.io/badge/Marshmallow-3.14.1-7A8080?style=for-the-badge
[Marshmallow-url]: https://marshmallow.readthedocs.io/en/stable/
