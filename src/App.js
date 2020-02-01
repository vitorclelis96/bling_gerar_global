import React, {useState, useEffect} from 'react';
import RelatorioGlobal from './RelatorioGlobal/RelatorioGlobal';
const Papa = require('papaparse');


function App() {
  const [file, setFile] = useState();
  const [fileData, setFileData] = useState();
  const [listClients, setListClientes] = useState();
  const [clienteRotaMap, setClienteRotaMap] = useState({});
  const [uniqueRoutes, setUniqueRoutes] = useState();
  const [selectedRoute, setSelectedRoute] = useState();
  const [relatorioGlobal, setRelatorioGlobal] = useState();

  const selectedRouteHandler = (event) => {
    setSelectedRoute(event.target.value);
  }

  // Handle file input
  const fileHandler = (event) => {
    setFile(event.target.files[0]);
  }

  // Handle file input form submit event
  const loadCsvHandler = (event) => {
    event.preventDefault();
    Papa.parse(file, {
      complete: (result) => {
        setFileData(result.data);
      }
    })
  }

  // Parse the fileData to get single clients list
  useEffect(() => {
    if (!fileData) {
      return;
    }
    let listaClientes = [...fileData].map((item) => item[5]);
    listaClientes = new Set(listaClientes);
    listaClientes.delete("Nome do contato");
    listaClientes.delete(undefined);
    listaClientes = Array.from(listaClientes);
    setListClientes(listaClientes);
  }, [fileData]);


  // TODO
  const clienteRotaHandler = (event) => {
    event.preventDefault();
    setUniqueRoutes( [...new Set(Object.values(clienteRotaMap))] );
  }

  // Updates the clientRotaMap
  const clientRotaMapHandler = (event) => {
    const cliente = event.target.name;
    const rota = event.target.value;
    setClienteRotaMap((oldState) => {
      const newState = {...oldState}
      newState[cliente] = rota
      return newState;
    });
  }

  const generateGlobalHandler = (event) => {
    event.preventDefault();
    console.log("EMPTY EGG CARTOON");
    generateGlobalData(selectedRoute);
  }

  const generateGlobalData = (route) => {
    console.log("fileData");
    console.log(fileData);
    console.log("clienteRotaMap");
    console.log(clienteRotaMap);

    const relatorioGlobal = {}

    for (let i =0; i<fileData.length; i++) {
      if (i === 0) {
        continue;
      }
      if (i === (fileData.length - 1)) {
        continue;
      }
      const contato = fileData[i][5];
      const descricao = fileData[i][19];
      const quantidade = Number(fileData[i][20].toString().replace(",00", ""));
      const codigo = fileData[i][26].toString();
      for (let key in clienteRotaMap) {
        if (contato.toString() === key.toString()) {
          if (clienteRotaMap[key] === route) {
            if (descricao in relatorioGlobal) {
              relatorioGlobal[descricao].quantidade += quantidade;
            } else {
              relatorioGlobal[descricao] = {
                codigo: undefined,
                quantidade: undefined
              }
              relatorioGlobal[descricao].codigo = codigo;
              relatorioGlobal[descricao].quantidade = quantidade;
            }
          }
        }
      }
      // passar tudo p um array
      const finalObjct = [];
      for (const key in relatorioGlobal) {
        const newObj = {
          nome: key,
          codigo: relatorioGlobal[key].codigo,
          quantidade: relatorioGlobal[key].quantidade
        }
        finalObjct.push(newObj);
      }

      finalObjct.sort((a, b) => {
        if (a.codigo > b.codigo) {
          return 1
        } else if (b.codigo > a.codigo) {
          return -1
        }
        return 0
      });
      setRelatorioGlobal(finalObjct);
    }
  }
  useEffect(() => {
    console.log(relatorioGlobal)
  }, [relatorioGlobal])


  let whatItShouldRender;
  if (relatorioGlobal) {
    whatItShouldRender = <RelatorioGlobal items={relatorioGlobal} />
  } else {
    whatItShouldRender = (
      <React.Fragment>
        <form onSubmit={loadCsvHandler} enctype="multipart/form-data">
          <input type="file" name="file" onChange={fileHandler} />
          <button type="submit">Submit</button>
        </form>
        {
          listClients ?
          <form onSubmit={clienteRotaHandler}>
            {listClients.map((client) => {
              return (
                <div key={client}>
                  {client.toString()} : 
                  <input 
                    type="text" 
                    name={client.toString()}    // .replace(/\s/g, "")
                    placeholder="Rota" 
                    onChange={clientRotaMapHandler}
                    required
                  />
                </div>
              )
            })}
            <button type="submit">Submit</button>
          </form>
          : null
        }
        {
          uniqueRoutes ?
            <form onSubmit={generateGlobalHandler}>
              <select value={selectedRoute} onChange={selectedRouteHandler}>
                <option></option>
                {uniqueRoutes.map((route) => {
                  return (
                    <option key={route} value={route}>{route.toString()}</option>
                  )
                })}
              </select>
              <button type="submit">Submit</button>
            </form>
          : null
        }
      </React.Fragment>
    )
  }

  return whatItShouldRender;
}

export default App;
