# Inventory App

This is a simple inventory app. It allows you to create, read, update, and delete items and item categories.

### How To Deploy Project Locally

1. This project requires you to have Node.js installed, refer to [their website](https://nodejs.org/en/download/) on how to get it installed.

2. Clone this repo to your local machine with one of the commands below. You can also read the GitHub documentation on [cloning a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

```
# If you have SSH set up with Git:
git clone git@github.com:curatedcode/inventory_app.git

# For HTTPS:
git clone https://github.com/curatedcode/inventory_app.git

# Finally, GitHub CLI:
gh repo clone curatedcode/inventory_app
```

3. ```cd``` into the directory of your local clone.


4. Install the required packages

``` 
npm install
```

5. This app requires you to have your own MongoDB Instance running. 
    - For sample data run
  ```
  node populatedb <your-mongodb-url>
  ```

6. Finally build and serve the repo

```
npm start
```

## Screenshots

![Categories](https://i.postimg.cc/L8jMR0Zr/category-list.png)
![Category](https://i.postimg.cc/1zHhVnBB/category-detail.png)
![Category Update](https://i.postimg.cc/RCbmTtBb/category-update.png)
![Items](https://i.postimg.cc/DZwVrvYT/item-list.png)
![Item](https://i.postimg.cc/CKYpKHGd/item-detail.png)
![Item Update](https://i.postimg.cc/Qx2r2rVQ/item-update.png)
