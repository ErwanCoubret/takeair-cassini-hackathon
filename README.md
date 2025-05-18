# Take*Air* Github Repository

This project was realised in the context of the [Cassini Hackathon](https://www.cassini.eu/hackathons/) in 2025 for its 9th edition.

## The pitch (it's a hackathon you know)

Climate conditions can severely impact seniors’ health and well being, especially those with preexisting conditions.

But right now, most tools aren't built with their specific needs in mind.

So we created **Take*Air***, a mobile health app that helps seniors to go out safely using localized climate data and recommendations tailored to their profile.

## Project Structure

**See the live demo [here](https://takeair.vercel.app/)**

This repository is splitted into two parts:
- The `data` folder contains the processes to get data from Copernicus system and to process it based on **a Jupyter notebook** and **Python scripts**.
- The `takeair-website` folder contains the web application based is based on **NextJS Framework** that corresponds to the live demo, showing Home, Map and Profile pages.

### Data

To get all the required libraries, you can use the `requirements.txt` at the root of the `data` folder.

```
pip install -r requirements.txt
```

And then launch the Jupyter notebook cells.

### TakeAir Website

To get all the required libraries and install dependencies, run this command in the `takeair-website` folder:

```
npm install
```

and then to launch the website, run:

```
npm run dev
```

