import SimpleFileDownloader from '../file/simple-file-downloader'

class ResumeService {
  private readonly fileName: string
  private readonly resumeGetUrl: string
  private readonly downloader: SimpleFileDownloader

  constructor() {
    const fileName = process.env.RESUME_FILE_NAME
    const resumeGetUrl = process.env.RESUME_GET_URL

    if (!fileName || !resumeGetUrl) {
      throw new Error('Missing RESUME_FILE_NAME or RESUME_GET_URL in environment')
    }

    this.fileName = fileName
    this.resumeGetUrl = resumeGetUrl
    this.downloader = new SimpleFileDownloader()
  }

  async getPdf(): Promise<Buffer> {
    return this.downloader.getFile(this.fileName, this.resumeGetUrl)
  }

  getFileName(): string {
    return this.fileName
  }
}

export default ResumeService
