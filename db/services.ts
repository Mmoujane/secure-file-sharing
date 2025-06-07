import { db } from './index';
import { users, files, categories, sharedFiles, departmentSharedFiles, departementCollaborations, fileTypes } from './schema';
import { eq, and, or, inArray } from 'drizzle-orm';

export const userService = {
  async createUser(name: string, passwordHash: string, email: string, departement: string, role: string, profileImage?: string) {
    return await db.insert(users).values({
      name,
      passwordHash,
      email,
      profileImage,
      departement,
      role,
      storageLimit: 1073741824, // 1GB in bytes
      storageUsed: 0
    }).run();
  },

  async updateUser(id: number, data: { name?: string; profileImage?: string; storageUsed?: number, isActive?: number }) {

  const cleanData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined)
  );

  if (Object.keys(cleanData).length === 0) {
    throw new Error('No valid fields to update');
  }

  console.log("clean data: ", cleanData);

    return await db.update(users)
      .set(cleanData)
      .where(eq(users.id, id))
      .run();
  },

  async getUserById(id: number) {
    return await db.select().from(users).where(eq(users.id, id)).get();
  },

  async getUserByEmail(email: string) {
    return await db.select().from(users).where(eq(users.email, email)).get();
  },

  async getUsersByDepartement(departement: string) {
    return await db.select().from(users).where(eq(users.departement, departement)).all();
  },

  async getUsersByRole() {
    return await db.select().from(users).where(eq(users.role, 'departement_admin')).all();
  },

  async deleteUser(userId: number) {
    return await db.delete(users).where(eq(users.id, userId)).run();
  },

  async deleteUsersByIds(Ids: number[]) {
    return await db.delete(users).where(inArray(users.id, Ids)).run();
  }
};

export const fileService = {
  async createFile(name: string, type: string, size: number, path: string, userId: number, categoryId?: number) {
    return await db.insert(files).values({
      name,
      type,
      size,
      path,
      userId,
      categoryId,
      isShared: 0
    }).run();
  },

  async getFilesByUserId(userId: number) {
    return await db.select().from(files).where(eq(files.userId, userId)).all();
  },

  async getFilesByUserIdAndType(userId: number, type: string[]) {
    return await db.select().from(files).where(and(eq(files.userId, userId), inArray(files.type, type))).all();
  },

  async getFilesByIds(Ids: number[]) {
    return await db.select().from(files).where(inArray(files.id, Ids)).all();
  },

  async deleteNotSharedFilesByUserId(Id: number) {
    return await db.delete(files).where(and(eq(files.userId, Id), eq(files.isShared, 0))).run();
  },

  async getNotSharedFilesByUserId(Id: number) {
    return await db.select().from(files).where(and(eq(files.userId, Id), eq(files.isShared, 0))).all();
  },

  async getFilesByCategory(categoryId: number) {
    return await db.select().from(files).where(eq(files.categoryId, categoryId)).all();
  },

  async getFilesByUsersIds(Ids: number[]) {
    return await db.select().from(files).where(inArray(files.userId, Ids)).all();
  },

  async deleteFile(id: number) {
    try{
      await db.delete(sharedFiles).where(eq(sharedFiles.fileId, id)).run();
      await db.delete(departmentSharedFiles).where(eq(departmentSharedFiles.fileId, id)).run();
      await db.delete(files).where(eq(files.id, id)).run();
      return { success: true, message: `File ${id} deleted from three tables` };
    }catch(error){
      console.error('Error deleting file:', error);
      return { success: false, error };
    }
  },

  async deleteFilesByUsersIds(Ids: number[]) {
    return await db.delete(files).where(inArray(files.userId, Ids)).run();
  },

  async updateFileSharedStatus(id: number, isShared: number) {
    return await db.update(files)
      .set({ isShared })
      .where(eq(files.id, id))
      .run();
  },

  async updateFileCategoryId(id: number, categoryId: number) {
    return await db.update(files)
      .set({ categoryId })
      .where(eq(files.id, id))
      .run();
  }
};

export const categoryService = {
  async createCategory(name: string, userId: number) {
    return await db.insert(categories).values({
      name,
      userId,
    }).run();
  },

  async getCategoriesByUserId(userId: number) {
    return await db.select().from(categories).where(eq(categories.userId, userId)).all();
  },

  async getCategoriesByName(name: string) {
    return await db.select().from(categories).where(eq(categories.name, name)).all();
  },

  async getCategoriesByNameAndUserId(name: string, userId: number) {
    return await db.select().from(categories).where(and(eq(categories.name, name), eq(categories.userId, userId))).all();
  },

  async deleteCategory(id: number) {
    return await db.delete(categories).where(eq(categories.id, id)).run();
  },

  async deleteCategoryByUserId(id: number) {
    return await db.delete(categories).where(eq(categories.userId, id)).run();
  },

  async deleteCategoryByUsersIds(ids: number[]) {
    return await db.delete(categories).where(inArray(categories.userId, ids)).run();
  }
};

export const sharedFileService = {
  // Peer-to-peer sharing within department
  async shareFileWithUser(fileId: number, senderId: number, receiverId: number) {
    return await db.insert(sharedFiles).values({
      fileId,
      senderId,
      receiverId
    }).run();
  },

  // Department-wide sharing
  async shareFileWithDepartment(fileId: number, senderId: number, departement: string) {
    return await db.insert(departmentSharedFiles).values({
      fileId,
      senderId,
      departement
    }).run();
  },

  async getSharedFilesByReceiver(receiverId: number) {
    return await db.select().from(sharedFiles).where(eq(sharedFiles.receiverId, receiverId)).all();
  },

  async getSharedFilesBySender(senderId: number) {
    return await db.select().from(sharedFiles).where(eq(sharedFiles.senderId, senderId)).all();
  },

  async getSharedFileById(FileId: number) {
    return await db.select().from(sharedFiles).where(eq(sharedFiles.fileId, FileId)).all();
  },

  async getSharedFileByIdInDepartement(FileId: number) {
    return await db.select().from(departmentSharedFiles).where(eq(departmentSharedFiles.fileId, FileId)).all();
  },

  async getDepartmentSharedFiles(departement: string) {
    return await db.select().from(departmentSharedFiles)
      .where(eq(departmentSharedFiles.departement, departement))
      .all();
  },

  async deleteSharedFilesBydepartement(departement: string) {
    return await db.delete(departmentSharedFiles).where(eq(departmentSharedFiles.departement, departement)).run();
  },

  async deleteSharedFilesByChangersIds(Ids: number[]) {
    return await db.delete(sharedFiles).where(inArray(sharedFiles.senderId, Ids)).run();
  }

};

export const departmentService = {
  async requestCollaboration(sourceDepartement: string, targetDepartement: string) {
    return await db.insert(departementCollaborations).values({
      sourceDepartement,
      targetDepartement,
      isApproved: 0
    }).run();
  },

  async approveCollaboration(sourceDepartement: string, targetDepartement: string) {
    return await db.update(departementCollaborations)
      .set({ isApproved: 1 })
      .where(and(
        eq(departementCollaborations.sourceDepartement, sourceDepartement),
        eq(departementCollaborations.targetDepartement, targetDepartement)
      ))
      .run();
  },

  async getCollaboratingDepartements(departement: string) {
    return await db.select().from(departementCollaborations)
      .where(and(
        or(
          eq(departementCollaborations.sourceDepartement, departement),
          eq(departementCollaborations.targetDepartement, departement)
        ),
        eq(departementCollaborations.isApproved, 1)
      ))
      .all();
  },

  async getAppendingColaboration(departement: string) {
    return await db.select().from(departementCollaborations)
      .where(
        or(
          eq(departementCollaborations.sourceDepartement, departement),
          eq(departementCollaborations.targetDepartement, departement)
        )
      )
      .all();
  },

   async getAppending(departement: string) {
    return await db.select().from(departementCollaborations)
      .where(and(
        eq(departementCollaborations.targetDepartement, departement),
        eq(departementCollaborations.isApproved, 0)
      ))
      .all();
  }
};

export const fileTypeService = {
  async getAllFileTypes() {
    return await db.select().from(fileTypes).all();
  },

  async getFileTypeByMimeType(mimeType: string) {
    return await db.select().from(fileTypes)
      .where(eq(fileTypes.mimeType, mimeType))
      .get();
  }
};

