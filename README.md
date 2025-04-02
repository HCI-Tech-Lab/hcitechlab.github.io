## 🖥️ Running the Website Locally

1. Download Node.js from [https://nodejs.org/en](https://nodejs.org/en)  
   **Recommended version:** `v22.12.0`

2. Verify installation:
   ```bash
   node -v
   ```

3. Clone the repository:
   ```bash
   git clone https://github.com/HCI-Tech-Lab/hcitechlab.github.io.git
   ```

4. Navigate to the project folder:
   ```bash
   cd hcitechlab.github.io
   ```

5. Install dependencies:
   ```bash
   npm install
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open your browser and go to:  
   [http://localhost:3000](http://localhost:3000)

---

## 🌿 Creating a Branch for Request Changes

1. Go to the **Branches** section in the GitHub repo.
2. Click **New Branch**.
3. Name your branch using the format: `YYMMDD-Name`  
   (Ensure the source is set to `main`)
4. In your code editor/terminal, run:
   ```bash
   git fetch origin
   git checkout <branchName>
   ```

5. Make your changes, commit, and push:
   ```bash
   git add .
   git commit -m "Your descriptive commit message"
   git push -u origin <branchName>
   ```

6. Go to your branch on GitHub and **create a Pull Request**,  
   adding **Professor** and/or **Murad** as reviewer.

---

## 👥 Member Update

- Member data is in: `src/data/members_data.js`

- Format:
   ```js
   {
     "img": "img/Member/filename",
     "hoverImg": "img/Member/filename",
     "name": "Member Name",
     "title": "Ph.D. Student / M.S. Student",
     "interest": "Research Interest",
     "link": "Link to Homepage",
     "mail": "Email Address",
     "linkedin": "Link to LinkedIn profile",
     "note": "Notes regarding coadvising/leave of absence/break"
   }
   ```

- To update the image:
  - Upload it to `public/img/Member/`
  - Set the `img` and `hoverImg` fields (⚠️ Do **not** use `/` at the beginning)
  - Follow naming convention: `Initials.jpg`, `InitialsHover.png`, etc.

---

## 📰 News Update

- News data is in: `src/data/news_data.js`

- Format:
   ```js
   {
     icon: "img/icon/award.png", // Choose from img/icon/
     title: "Title",
     date: "Mar 28 2025",
     content: "Text content or use HTML for links",
     images: ["img/news/example1.png", "img/news/example2.jpg"],
     // Optional
     extraContent: "<div>Additional HTML shown when 'Read more' is clicked</div>"
   }
   ```

- Upload images to the `public/` folder  
  (⚠️ Do **not** add `/` at the start of image paths)

---

## 📚 Publication Update

- Publication data is located in: `src/data/research_data.js`

- Format:
  ```js
  {
    poster: "research/2025/TVCG/TVCG_01.png",
    demo: "research/2025/TVCG/TVCG_01.mp4",
    title: "Research Title",
    authors: "Authors",
    status: "When and where it is going to be published",
    conference: "Name of Conference",
    conferenceLink: "https://conference-website.com",
    award: "Details if any award won",
    website: "https://project-website.com",
    doi: "https://doi-link.com",
    video: "video file or link",
    pdf: "research/2025/TVCG/TVCG_01.pdf",
    presentation: "file or link",
    media: "media link",
    highligt: false, // Whether the publication appears on the main page (keep as false when adding)
    category: "Conference / Journal (peer-reviewed)" 
    // Options:
    // "Conference / Journal (peer-reviewed)"
    // "Poster / Demo / Workshop"
    // "Domestic Conference / Journal"
    // "Preprint"
  }
  ```

- Upload poster images, demo videos, PDFs, etc. to:  
  `public/research/<year>/<conference>/<filename>`

- Then use the relative path:  
  `"research/<year>/<conference>/<filename>"`

- ⚠️ If a file or video doesn't exist, set its field to an empty string: `""`

---


