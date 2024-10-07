import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { Doc, Id } from "./_generated/dataModel"

// Archive a document and its children
export const archive = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject
    const existingDocument = await ctx.db.get(args.id)

    if (!existingDocument) {
      throw new Error("Not found")
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized")
    }

    const recursiveArchive = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect()

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true,
          updatedAt: Date.now(),
        })
        await recursiveArchive(child._id)
      }
    }

    const document = await ctx.db.patch(args.id, {
      isArchived: true,
      updatedAt: Date.now(),
    })

    recursiveArchive(args.id)
    return document
  },
})

// Get documents in the trash
export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect()
    return documents
  },
})

// Restore a document and its children
export const restore = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject
    const existingDocument = await ctx.db.get(args.id)

    if (!existingDocument) {
      throw new Error("Not found")
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized")
    }

    const recursiveRestore = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect()

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: false,
          updatedAt: Date.now(),
        })
        await recursiveRestore(child._id)
      }
    }

    const options: Partial<Doc<"documents">> = {
      isArchived: false,
      updatedAt: Date.now(),
    }

    if (existingDocument.parentDocument) {
      const parent = await ctx.db.get(existingDocument.parentDocument)
      if (parent?.isArchived) {
        options.parentDocument = undefined
      }
    }

    const document = await ctx.db.patch(args.id, options)
    recursiveRestore(args.id)
    return document
  },
})

// Remove a document
export const remove = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject
    const existingDocument = await ctx.db.get(args.id)

    if (!existingDocument) {
      throw new Error("Not found")
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized")
    }

    const document = await ctx.db.delete(args.id)
    return document
  },
})

// Get sidebar documents
export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect()
    return documents
  },
})

// Get documents ordered by updatedAt
export const getDocuments = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not Authenticated")
    }
    const documents = await ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect()

    documents.sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))
    return documents
  },
})

// Create a new document
export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject
    const now = Date.now()

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
      updatedAt: now,
    })
    return document
  },
})

// Search documents
export const getSearch = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect()
    return documents
  },
})

// Get a document by ID
export const getById = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    const document = await ctx.db.get(args.documentId)
    if (!document) {
      throw new Error("Not Found")
    }

    if (document.isPublished) {
      return document
    }

    if (!identity) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject
    if (document.userId !== userId) {
      throw new Error("Not authorized")
    }

    return document
  },
})

// Update a document
export const update = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Unauthenticated")
    }

    const userId = identity.subject
    const { id, ...rest } = args
    const existingDocument = await ctx.db.get(id)

    if (!existingDocument) {
      throw new Error("Not found")
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized")
    }

    const document = await ctx.db.patch(id, {
      ...rest,
      updatedAt: Date.now(),
    })

    return document
  },
})

// Remove the icon from a document
export const removeIcon = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Unauthenticated")
    }

    const userId = identity.subject
    const existingDocument = await ctx.db.get(args.id)

    if (!existingDocument) {
      throw new Error("Not found")
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized")
    }

    const document = await ctx.db.patch(args.id, {
      icon: undefined,
      updatedAt: Date.now(),
    })

    return document
  },
})

// Remove the cover image from a document
export const removeCover = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Unauthenticated")
    }

    const userId = identity.subject
    const existingDocument = await ctx.db.get(args.id)

    if (!existingDocument) {
      throw new Error("Not found")
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized")
    }

    const document = await ctx.db.patch(args.id, {
      coverImage: undefined,
      updatedAt: Date.now(),
    })

    return document
  },
})
