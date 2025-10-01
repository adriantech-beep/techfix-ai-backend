import Guide from "../model/Guide.js";

export class GuideService {
  async createGuide(data) {
    const guide = new Guide(data);
    return guide.save();
  }

  async getAllGuides(data) {
    return Guide.find(data).sort({ createdAt: -1 });
  }

  async getGuideById(id) {
    return Guide.findById(id);
  }

  async updateGuide(id, data) {
    return Guide.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteGuide(id) {
    return Guide.deleteOne(id);
  }
}
