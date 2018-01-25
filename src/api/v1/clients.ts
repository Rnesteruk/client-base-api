import { Request, Response, NextFunction } from "express";
import { Client } from "../../models";
import * as R from "ramda";

export {
  getClients,
  getClient,
  addClient,
  updateClient,
  deleteClient,
};

function getClients(req: Request, res: Response, next: NextFunction) {
  const skip = +req.query.skip || 0;
  const limit = +req.query.top || 0;
  return Client.find({})
    .skip(skip)
    .limit(limit)
    .then(clients => res.json(clients))
    .catch(next);
}

function addClient(req: Request, res: Response, next: NextFunction) {
  const props = getClientProps(req.body);
  const client = new Client(props);
  return client.save()
    .then(data => res.json(data))
    .catch(next);
}

function getClient(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  return Client.findOne({ id })
    .then(handleNotFound(id))
    .then(data => res.json(data))
    .catch(next);
}

function updateClient(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const client = getClientProps(req.body);
  return Client.findOneAndUpdate({ id }, client)
    .then(handleNotFound(id))
    .then(data => res.json(data))
    .catch(next);
}

function deleteClient(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  return Client.findOneAndRemove({ id })
    .then(handleNotFound(id))
    .then(data => res.json(data))
    .catch(next);
}

function getClientProps(body: any): any {
  let client = {};
  const getVal = R.flip(R.path)(body);
  const isNotNill = R.complement(R.isNil);

  Client.schema.eachPath((path) => {
    const keys = path.split(".");
    const value = getVal(keys);

    if (isNotNill(value) && !isIgnoredProp(path)) {
      client = R.assocPath(keys, value, client);
    }
  });
  return client;
}

function handleNotFound(id: string) {
  return (data: any) => {
    if (!data) {
      throw new Error(`id "${id}": not found`);
    }
    return data;
  };
}

function isIgnoredProp(path: string): boolean {
  return ["_id", "__v", "id"].indexOf(path) > -1;
}
