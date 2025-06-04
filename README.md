# Haystack Labs

This is the repository for Haystack Labs. The goal of this repo is to provide a better way to document the projects and participants of Labs. 

**##Website** | `/website`
I would like to make a nice looking website to host all of the documentation, participant, archive, etc. 

**Website URL:** [https://labs.haystack-mtn.org](https://labs.haystack-mtn.org). 

### Technical Details
- Astro (Static Site Generator) 
- Markdown (Astro pulls in an render markdown)
- Deployed to Cloudflare Workers 

**##Documentation** | `/docs`
This is where the core content of this project will reside. I am thinking this will be an interesting "open source" way to build contributions among Labs Participants. Unless we implement a proper CMS down the road (see next section), this will effectively be the content management system. Just a bunch of markdown (or mdx) files that Astro will automatically load and render into the website. I can create some specific content schemas and conventions for people to follow so things look nice and consistent, or I take a fast and loose approach. See some of my content examples for different ways to write markdown content. It's a little strange if you have never written before, but it does not take too long to get used to. I'll add some documentation to the documenation on how to write proper documentation with markdown 🤓. 


For, now, to get started, I made the following directory structure. My mind is open if you have suggestions for alternative organization, but this seemed to make the most sense without over thinking things: 

### 🥳 Participants -- `docs/participants/` 
You. All about you. The most important about Labs and documenting Labs is the amazing people who come and collaborate. Please document who you are, what you do, and whatever else you want people (and the internet) to know about you. 

1. Make yourself a folder in the participant directory. 
2. Use your name as the folder name, using kebab-case please (e.g. james-rutter). 
3. Create a `about.md` file about yourself
4. Go nuts with what you put into this folder, just don't add a bunch of videos or copywritten material. 

### 🪵 Projects --- `docs/projects`
1. First, check to see if a project already exists. 
2. If it does not, go ahead and create a new folder, using kebab-case (e.g., blair-winch-project). 
3. Create an `about.md` or an `index.md` - not really sure it matters.
4. Each project will vary in the amount of documentation and structure. Some might be ongoing projects, some might be one-offs. Keep it simple to start with, and we can overengineer it later. 

### 🛠️ Tools --- `docs/tools` (?)
This is for documentation of the new tools, or old tools. any tool really. Did you "wake up" a tool while at Labs? Go ahead and tell that story here. We're interested. Follow the same conventions as above. Tools might be best kept inside of projects, or associated with a specific project. I don't know, I'm open to suggestions and changing my mind. 

### ⚙️ Resources --- `docs/resources` (?)
Anything that is not a project or a tool, but is still useful to the community. In general, try to keep project-related guides and tutorials out of here and into their respective project folders. I may delete this folder if it becomes too confusing. 

## Content Managemen System (Future Idea...)
I am considering implementing a simple content management system so that there is a more user friendly way to structure the content, have people contribute, etc. I am looking into: 

- Strapi 
- Directus 

Open to other suggestions, both those are both open-source and self-hostable options. 


>😒 If you hate everything about what you just read and refuse to use markdown to write your docs, please let me know! If you are interested in using it, but are not sure how to get started and feel confused by all of this, also let me know - I will help you. Markdown is a great portable format to keep your notes/docs in. Google Docs can import/export markdown now. Obsidian is my favorite markdown editor. I have lots of other opinions if you want to hear them. 