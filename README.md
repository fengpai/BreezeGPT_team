<h1 align="center"><b>BreezeGPT</b></h1>

<p align="center">
   English Version |
   <a href="README-zh_CN.md">
      简体中文版
   </a>
</p>

<p align="center">
    <a href="https://breezegpt.dev" target="_blank"><img src="public/apple-touch-icon.png" alt="Better ChatGPT" width="100" /></a>
</p>

<h4 align="center"><b>A more slick and natural user interface for ChatGPT</b></h4>

<p align="center">
    <a href="https://breezegpt.dev">Demo website</a>
    ·
    <a href="https://github.com/quentinzhang/BreezeGPT/issues">Report an issue</a>
</p>

## The Origin of the Project

Because of my work, I often have to do Prompt testing and have always been looking for a good Prompt development tool. By chance, I discovered the excellent project, [Better ChatGPT](https://github.com/ztjhz/BetterChatGPT/tree/main), which includes some features that the original ChatGPT interface does not have, such as inserting system role content at any position in the dialogue. It provides greater flexibility for my daily work.

However, I found the user interface of Better ChatGPT a bit cumbersome. So, my obsession kicked in and I decided to do some secondary development on the code base of Better ChatGPT, aiming to create a more natural and friendly user interface for ChatGPT.

I've always believed that a good tool can not only improve efficiency, but also make people feel relaxed and comfortable. So, I gave this open-source project a bit of a provocative name, BreezeGPT, in the hope of providing everyone with a smooth, natural ChatGPT user experience, just like a gentle breeze.

## Features

BreezeGPT maintains most of the distinctive features of Better ChatGPT, including:

- Proxy to bypass ChatGPT regional restrictions
- Prompt library
- Organize chats into folders (with colours)
- Filter chats and folders
- Token count and pricing
- ShareGPT integration
- Custom model parameters (e.g. presence_penalty)
- Chat as user / assistant / system
- Edit, reorder and insert any messages, anywhere
- Chat title generator
- Save chat automatically to local storage
- Import / Export chat
- Download chat (markdown / image / json)
- Sync to Google Drive
- Azure OpenAI endpoint support
- Multiple language support (i18n)

For a more detailed introduction to the features, please visit: ：https://github.com/ztjhz/BetterChatGPT/blob/main/README.md

## UI Optimizations

Meanwhile, BreezeGPT has made a lot of adjustments and trials on the UI interface of ChatGPT. First, I believe that a product should have a clear, distinct audience. So, I renamed the original "Advanced Mode" to "Developer Mode", to meet developers' pursuit of flexibility and efficiency when debugging prompts. The regular mode, on the other hand, is designed to be simple and easy to use, akin to the native ChatGPT chat interface. Many adjustments have been made to the features and UI under these two modes based on this idea.

Here is a list of specific UI improvements:

### For Developer Mode:
- Auto-saving during the prompt editing process, no more worries about message loss
- Easier role-switching by clicking on the avatar (usually requiring fewer clicks than using the drop-down menu)
- Smarter message deletion, with one-click deletion of empty messages without confirmation
- Entering and exiting message editing mode with a single click in the message and other content areas
- De-emphasizing the function of inserting messages in the middle of the conversation
- Placing the reply generation button at the bottom of the page for a more consistent interface

### For Chat Mode:
- Fixing the function area for writing and sending messages at the bottom of the page, instead of having it scroll with the page content
  - Simplifying by removing some less frequently used features in everyday chat, such as:
  - Removing the function of freely sorting dialogue messages by moving them up and down
  - Removing the function of inserting messages in the middle of the dialogue
  - Removing the function of freely switching dialogue roles
  - Removing the function of inserting system roles at the top of the dialogue

### For Both Modes:
- Differentiating whether it's GPT-3.5 or GPT-4 by the color of the assistant user icon
- Collapsing infrequently used operations such as sharing, downloading, copying dialogues, etc., into the Speed Dial menu at the lower right corner

## Runing locally

1. Running the Project
Ensure you have installed the following:

   - [node.js](https://nodejs.org/en/)
   - [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

1. Clone the repository by running `git clone https://github.com/quentinzhang/BreezeGPT.git` to clone the repository
2. Enter the directory by `cd BetterChatGPT`
3. Run `yarn` or `npm install`, depending on whether you have installed yarn or npm.
4. Run `yarn dev` or `npm run dev` to launch the development environment
5. Run `yarn build` or `npm run build` to compile for production.

## Usage

- For first-time users, you need to enter your OpenAI API Key. You can also choose to use your own API endpoint proxy. [Fetch](https://platform.openai.com/account/api-keys)
- You can also choose to use your own API endpoint proxy.

## ⭐️ Support me

<h3 align="center">
    Give <b>BreezeGPT</b>  BreezeGPT a star  ⭐️，and give me some encouragement and motivation to move on❤️
</h3>