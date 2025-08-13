# 🎨 Customization Guide

## Quick Start Customization

### 1. Personal Information
Open `js/app.js` and update these key sections:

#### Hero Section
```javascript
// Update name and roles in HeroSection component
const roles = ['Web Developer', 'Software Developer', 'Your Custom Role'];
```

#### Contact Information
Search for and replace:
- `[Your Email]` → your.email@example.com
- `[Your LinkedIn]` → https://linkedin.com/in/yourprofile
- `[Your GitHub]` → https://github.com/yourusername

### 2. Projects Customization
In the `ProjectsSection` component, update the projects array:

```javascript
const projects = [
  {
    title: 'Your Project Name',
    description: 'Your project description...',
    technologies: ['React', 'Node.js', 'MongoDB'],
    image: './assets/images/your-project.jpg',
    liveUrl: 'https://your-live-demo.com',
    githubUrl: 'https://github.com/yourusername/project',
    features: ['Feature 1', 'Feature 2', 'Feature 3']
  }
];
```

### 3. Skills Customization
Update the skills array in `SkillsSection`:

```javascript
const skills = [
  { name: 'Your Skill', level: 85, icon: 'fab fa-icon', color: 'from-blue-500 to-cyan-500' }
];
```

### 4. Color Scheme
In `index.html`, modify the Tailwind config:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#your-primary-color',
          // ... other shades
        }
      }
    }
  }
}
```

### 5. Images
Replace placeholder images in `assets/images/`:
- Add your profile photo as `profile.jpg`
- Add project screenshots
- Add about section photo

### 6. Resume
Add your resume as `assets/resume.pdf`

## Advanced Customization

### Adding New Sections
1. Create a new component function
2. Add it to the main App component
3. Update navigation links
4. Add scroll functionality

### Custom Animations
Add custom CSS animations in the `<style>` section of `index.html`

### Theme Colors
Modify the gradient backgrounds and color schemes throughout the components

## Testing Your Changes
1. Open `index.html` in a browser
2. Test all sections and links
3. Verify responsive design on different screen sizes
4. Test dark/light mode toggle

## Deployment Checklist
- [ ] Updated all placeholder text
- [ ] Added real images
- [ ] Added resume PDF
- [ ] Updated contact links
- [ ] Tested all functionality
- [ ] Optimized images
- [ ] Verified mobile responsiveness
