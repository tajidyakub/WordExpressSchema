export default function WordExpressResolvers(Connectors, publicSettings) {
  const Resolvers = {
    Query: {
      settings() {
        return publicSettings
      },
      category(_, { term_id, name }) {
        return Connectors.getTerm(term_id, name)
      }, 
      posts(_, args) {
        return Connectors.getPosts(args)
      },
      menus(_, {name}) {
        return Connectors.getMenu(name)
      },
      post(_, {name, id}) {
        return Connectors.getPost(id, name)
      }, 
      postmeta(_, {post_id, keys}) {
        return Connectors.getPostmeta(post_id, keys)
      },
      user(_, {userId}) {
        return Connectors.getUser(userId)
      },
    },
    Category: {
      posts(category, args) {
        return Connectors.getTermPosts(category.term_id, args)
      }
    },
    Post: {
      layout(post) {
        return Connectors.getPostLayout(post.id)
      },
      post_meta(post, keys) {
        return Connectors.getPostmeta(post.id, keys)
      },
      thumbnail(post) {
        return Connectors.getPostThumbnail(post.id)
      },
      author(post) {
        return Connectors.getUser(post.post_author)
      },
      categories(post) {
        return Connectors.getPostTerms(post.id)
      }
    },
    Postmeta: {
      connecting_post(postmeta) {
        return Connectors.getPost(postmeta.meta_value)
      }
    },
    Menu: {
      items(menu) {
        return menu.items
      }
    },
    MenuItem: {
      navitem(menuItem) {
        return Connectors.getPost(menuItem.linkedId)
      },
      children(menuItem) {
        return menuItem.children
      }
    }
  }

  return Resolvers
}
