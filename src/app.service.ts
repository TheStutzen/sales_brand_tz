import { HttpException, Injectable } from '@nestjs/common'
import { AmoCrmService } from './amoCrm/amoCrm.service'

@Injectable()
export class AppService {
  constructor(private readonly amoCrmService: AmoCrmService) {}

  async getApiResponse(endpoint: string): Promise<any> {
    const response = await this.amoCrmService.getClient('get', endpoint)
    if (!response) {
      throw new HttpException('Not Found', 404)
    }
    return response.data._embedded
  }

  /**
   * @returns {Object} An object containing information about deals, funnels, users and contacts
   * @returns {Lead[]} Leads Array of deals
   * @returns {Pipeline[]} Pipelines An array of funnels
   * @returns {User[]} users Array of users
   * @returns {Contact[]} contacts Array of contacts
   */
  async getLeads(): Promise<any> {
    try {
      const [leads, pipelines, users, contacts] = await Promise.all([
        this.getApiResponse('/api/v4/leads'),
        this.getApiResponse('/api/v4/leads/pipelines'),
        this.getApiResponse('/api/v4/users'),
        this.getApiResponse('/api/v4/contacts'),
      ])

      const pipelineId = leads.leads[0].pipeline_id
      const pipelineDetails = await this.getApiResponse(
        `/api/v4/leads/pipelines/${pipelineId}`,
      )

      return JSON.stringify(
        {
          leads,
          pipelineDetails,
          users,
          contacts,
        },
        null,
        2,
      )
    } catch (error) {
      throw new HttpException(error.message, error.status || 500)
    }
  }
}
