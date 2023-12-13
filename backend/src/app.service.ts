export class AppService {
  async checkConnection(res) {
    return res
      .status(200)
      .json({ status: 'OK', message: 'Succesfully queried models' });
  }
}
