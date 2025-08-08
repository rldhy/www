import NodeCache from 'node-cache'

class SimpleFileDownloader {
  private cache: NodeCache

  constructor() {
    this.cache = new NodeCache({ stdTTL: 3600 }) // 1 hour TTL
  }

  async getFile(fileName: string, url: string): Promise<Buffer> {
    const cacheKey = `file:${fileName}`

    const cached: Buffer | undefined = this.cache.get(cacheKey)
    if (cached) {
      console.log(`[${fileName}] served from cache`)
      return cached
    }

    console.log(`[${fileName}] downloading from: ${url}`)
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch file from ${url}. Status: ${response.status}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    this.cache.set(cacheKey, buffer)
    return buffer
  }
}

export default SimpleFileDownloader
