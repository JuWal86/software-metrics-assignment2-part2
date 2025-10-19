# Accessibility Evaluation Index (AEI)

## Overview
The **Accessibility Evaluation Index (AEI)** is a lightweight analysis tool designed to evaluate and compare the accessibility quality of web repositories.  
It scans HTML, JSX, and TSX files to identify accessibility-related features (such as `alt`, `aria`, and semantic tags) and computes an overall score that reflects the repository’s accessibility practices.

The AEI helps developers and researchers assess how well a web project integrates inclusive design principles and identify areas for improvement.

---

## Objectives
- Measure accessibility quality across multiple repositories  
- Provide a reproducible and interpretable accessibility score (AEI)  
- Detect missing accessibility features (labels, alt text, keyboard support)  
- Encourage more accessible coding practices in open-source projects  

---

## Key Concepts

### Accessibility Evaluation Index (AEI)
A numerical score between **0 and 100**, calculated using accessibility-related features normalized by the total number of HTML tags in a file.

\[
AEI = \text{clamp}(0–100) \left[ \frac{(alt + aria + semantic + label + keyboard)}{(\text{totalTags}/100)} - 10 \times penalties \right]
\]

### Accessibility Features
| Metric | Description |
|--------|--------------|
| **altCount** | Number of `<img>` tags with non-empty `alt` attributes |
| **ariaCount** | Elements using valid `aria-*` attributes |
| **semanticCount** | Use of semantic HTML5 elements (`<header>`, `<main>`, `<section>`, etc.) |
| **labelCount** | `<label>` elements linked to form inputs |
| **keyboardCount** | Keyboard support (`tabindex`, key events) |
| **penalties** | Deductions for missing or misused accessibility attributes |

Files with fewer than **50 total tags** are ignored to avoid noise from small fragments or test files.

---

## ⚙️ Features
- Scans repositories automatically and outputs JSON summaries  
- Normalizes accessibility scores by file size and tag density  
- Provides repository-level averages for quick comparison  
- Modular and easy to extend to other accessibility heuristics  

---

## Repositories Analyzed
The AEI was tested on the following ten repositories:

```bash
git clone https://github.com/a11yproject/a11yproject.com.git
git clone https://github.com/twbs/bootstrap.git
git clone https://github.com/facebook/docusaurus.git
git clone https://github.com/gatsbyjs/gatsby.git
git clone https://github.com/gohugoio/hugoDocs.git
git clone https://github.com/vercel/next.js.git
git clone https://github.com/reactjs/react.dev.git
git clone https://github.com/readthedocs/readthedocs.org.git
git clone https://github.com/julwalt/static-accessibility.git
git clone https://github.com/julwalt/website.git
