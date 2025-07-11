import { SORT_ORDER } from "../constants/index.js";
import Contact from "../models/contact.model.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getContacts = async ({
    page = 1,
    perPage = 10,
    sortBy = '_id',
    sortOrder = SORT_ORDER.ASC,
    filter = {},
    userId
}) => {
    const skip = (page - 1) * perPage;
    const limit = perPage;
    filter.userId = userId;

    const filterQuery = Contact.find(filter);

  if (filter.contactType !== undefined)
    filterQuery.where('contactType').equals(filter.contactType);

  if (filter.isFavourite !== undefined)
    filterQuery.where('isFavourite').equals(filter.isFavourite);
    
    const sortOptions = { [sortBy]: sortOrder === SORT_ORDER.DESC ? -1 : 1 };

    const contactsQuery = Contact.countDocuments(filter)
        .clone()
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .exec();
    
    const countQuery = Contact.countDocuments(filter);
    const [contacts, count] = await Promise.all([
        contactsQuery,
        countQuery,
    ]);
    const paginationData = calculatePaginationData(count, page, perPage);
  return { data: contacts, ...paginationData };
};

export const findContactById = async (id, userId) => {
    return await Contact.findOne({_id: id, userId});
};

export const createContact = async (data) => {
    const newContact = await Contact.create(data);
    return newContact;
};

export const updateContactById = async (id, data, userId) => {
    return await Contact.findOneAndUpdate({_id: id, userId}, data, { new: true });
};

export const deleteContactById = async (id, userId) => {
    await Contact.findOneAndDelete({ _id: id, userId });
};

export const updateStatusContact = async (id, data, userId, options = {}) => {
    const rawResult = await Contact.findOneAndUpdate(
        { _id: id, userId },
        data,
        {
          new: true,
          includeResultMetadata: true,
          ...options,
        },
      );
    
      if (!rawResult || !rawResult.value) return null;
    
      return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
      };
};

export const countContacts = async (filter = {}) => {
    return await Contact.countDocuments(filter);
};