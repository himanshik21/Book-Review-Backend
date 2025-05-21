# Setting Up and Pushing to GitHub

Follow these steps to create a GitHub repository and push your code:

## 1. Create a GitHub Account (if you don't have one)

Visit [GitHub](https://github.com/) and sign up for an account.

## 2. Install Git (if not already installed)

Download and install Git from [git-scm.com](https://git-scm.com/downloads).

## 3. Configure Git

Open a terminal or command prompt and set your Git username and email:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 4. Create a New Repository on GitHub

1. Log in to GitHub
2. Click the "+" icon in the top right corner and select "New repository"
3. Enter a repository name (e.g., "book-review-api")
4. Add a description (optional)
5. Choose "Public" visibility
6. Skip adding README, .gitignore, and license for now
7. Click "Create repository"

## 5. Initialize Git in Your Project

In your project folder, open a terminal or command prompt and run:

```bash
# Initialize Git repository
git init

# Add all files to staging
git add .

# Commit the changes
git commit -m "Initial commit"
```

## 6. Link and Push to GitHub

GitHub will show you commands after creating the repository. Use these commands:

```bash
# Add the remote GitHub repository
git remote add origin https://github.com/yourusername/book-review-api.git

# Push your code to GitHub
git push -u origin main
```

Note: If your default branch is called "master" instead of "main", use:

```bash
git push -u origin master
```

## 7. Verify Your Repository

Visit your GitHub profile, and you should see your new repository with all your code uploaded.

## 8. Submit Your Assignment

Send the repository link to humans@billeasy.in or reply to the interview email with your GitHub repository URL.