# Project Documentation Template

This directory contains project documentation for Haystack Labs. Each project should have its own folder with a standardized `index.md` file.

## Creating a New Project

1. **Create a project folder** using kebab-case naming (e.g., `my-project-name`)
2. **Copy the template**: Copy `project-template.md` to your project folder and rename it to `index.md`
3. **Update the frontmatter** (the section between `---` at the top)
4. **Fill in the content sections**

## Frontmatter Fields

The frontmatter section contains metadata about your project:

```yaml
---
title: Your Project Title
year: 2025
url: ""                    # Main project URL (optional)
category: digital-fabrication  # Project category
type: project
photos: []                 # List of photo filenames
videos: []                 # List of video filenames  
tools: ["Tool 1", "Tool 2"]  # Tools/equipment used
tags:                      # Tags for discovery
  - project
  - relevant-tag
  - category-tag
---
```

### Categories
Common categories include:
- `digital-fabrication`
- `craft`
- `biomaterials`
- `textiles`
- `electronics`
- `computational`

### Tools
List the main tools, equipment, or software you'll be using:
- `3D Scanner`
- `CNC Mill`
- `Laser Cutter`
- `Arduino`
- `Python`
- etc.

### Tags
Add relevant tags to help people discover your project:
- Always include `project`
- Add category-related tags
- Add tool-related tags
- Add technique/method tags

## Content Sections

The template includes these standard sections:

- **Project Overview**: Brief description of what the project is
- **Goals & Objectives**: What you're trying to achieve
- **Background & Motivation**: Context and inspiration
- **Contributors**: Who's working on the project
- **Technical Requirements**: Equipment, materials, software needed
- **Applications & Integrations**: How it fits into broader context
- **Results**: Outcomes and findings
- **Documentation**: Process and artifacts
- **References**: Related work and inspiration
- **Acknowledgments**: Thanks and credits
- **Notes**: Additional comments

## Optional Sections

- **Timeline & Milestones**: Daily progress log
- Add any custom sections relevant to your project

## Tips

- Use *italics* for placeholder text that should be replaced
- Keep sections concise but informative
- Add images by placing them in your project folder and referencing them
- Link to external resources, repositories, or websites as needed
- Update your documentation throughout the project, not just at the end

## Need Help?

If you need help with markdown formatting or have questions about the template, ask a facilitator or check the main repository README.
