# Haystack Labs

This is the repository for Haystack Labs. The goal of this repo is to provide a better way to document the projects and participants of Labs. 

## The Website 
There will be a nice looking website to host all of the documentation, etc. Currently using Astro with markdown files for a static site generator. 

## The CMS (optional)
To try and limit the barriers, and make it easier for people to contribute - I am setting up a CMS that will hook into the Astro website. Markdown is great, but it is not for everyone. I may switch entirely to using the CMS, or abadoned that completed and have everything just be markdown files.

**## The Docs (markdown)**
The docs area are markdown files. Astro understands markdown (or mdx) and can serve these up. You can use frontmatter to add metadata to the markdown files. But I need to setup a "content collection" with a proper schema so that front matter can be used and validated when loading into the website. 

For, now, to get started, we can follow the basic pattern for adding files: 

### Participants -- `docs/participants/` 
1. Make yourself a folder in the participant directory. 
2. Use your name as the folder name, using kebab-case please (e.g. james-rutter). 
3. Create a `about.md` file about yourself
4. Go nuts with what you put into this folder, just don't add a bunch of videos or copywritten material. 

### Projects --- `docs/projects`
1. First, check to see if a project already exists. 
2. If it does not, go ahead and create a new folder, using kebab-case (e.g., blair-winch-project). 
3. Create an `about.md` or an `index.md` - not really sure it matters.
4. Each project will vary in the amount of documentation and structure. Some might be ongoing projects, some might be one-offs. Keep it simple to start with, and we can overengineer it later. 

### Tools --- `docs/tools` (?)
This is for documentation of the new tools, or old tools. any tool really. Did you "wake up" a tool while at Labs? Go ahead and tell that story here. We're interested. Follow the same conventions as above. Tools might be best kept inside of projects, or associated with a specific project. I don't know, I'm open to suggestions and changing my mind. 

### Resources --- `docs/resources` (?)
Anything that is not a project or a tool, but is still useful to the community. In general, try to keep project-related guides and tutorials out of here and into their respective project folders. I may delete this folder if it becomes too confusing. 

>! If you hate everything about what you just read and refuse to use markdown to write your docs, please let me know! If you are interested in using it, but are not sure how to get started and feel confused by all of this, also let me know - I will help you. Markdown is a great portable format to keep your notes/docs in. Google Docs can import/export markdown now. Obsidian is my favorite markdown editor. I have lots of other opinions if you want to hear them. 