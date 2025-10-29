# CORS Anywhere Lite

> A super-tiny CORS proxy server. Disable CORS restrictions for your frontend applications.

## Features

- Tiny implementation
- TypeScript support
- Docker support for easy deployment
- Environment variable configuration
- Simple and lightweight, perfect for development and small projects
- Supports authentication via an API key
- Uses native Node.js HTTP module for better performance

## Installation

```bash
git clone https://github.com/bartholomej/cors-anywhere-lite.git
cd cors-anywhere-lite
yarn install
```

## Usage

Start the server

```bash
yarn start
```

> Localhost server will start on `http://localhost:3000`.

Now in your browser you can make a GET request to the endpoint with the `url` query parameter.

And CORS is _disabled_!

```javascript
fetch('http://localhost:3000/?url=https://example.com/api/data')
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
```

## Configuration (optional)

Create a `.env` file in the root directory based on the `.env.sample` file:

```env
AUTH_TOKEN=your_auth_token_here
PORT=3000
```

- `AUTH_TOKEN`: The authentication token required for authorization.
- `PORT`: The port on which the server will run (default is 3000).

## 📦 Docker

We have [prepared a Docker image](https://hub.docker.com/r/bartholomej/cors-anywhere-lite) for you.

### Prebuilt image

```bash
docker pull bartholomej/cors-anywhere-lite
```

### Build & run your own image

Build the Docker image:

```bash
docker build -t cors-anywhere-lite .
```

Run the Docker container:

```bash
docker run -d -p 3000:3000 cors-anywhere-lite
```

## 🤝 Contribution

I welcome you to customize this according to your needs ;)

Pull requests for any improvements would be great!

## ⭐️ Show your support

Give a ⭐️ if this project helped you!

Or if you are brave enough consider [making a donation](https://github.com/sponsors/bartholomej) for some 🍺 or 🍵 ;)

## 🕵️‍♀️ Privacy Policy

I DO NOT STORE ANY DATA. PERIOD.

I physically can't. I have nowhere to store it. I don't even have a server database to store it. So even if Justin Bieber asked nicely to see your data, I wouldn't have anything to show him.

That's why, with node-csfd-api, what happens on your device stays on your device till disappear.

## 📝 License

Copyright &copy; 2025 [Lukas Bartak](http://bartweb.cz)

Proudly powered by nature 🗻, wind 💨, tea 🍵 and beer 🍺 ;)

All contents are licensed under the [MIT license].

[mit license]: LICENSE
