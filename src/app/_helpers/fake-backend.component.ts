import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions) {
  // configure fake backend
  backend.connections.subscribe((connection: MockConnection) => {
    let testUser = { username: 'test', password: 'test', firstName: 'Test', lastName: 'User' };

    // wrap in timeout to simulate server api call
    setTimeout(() => {

      // fake authenticate api end point
      switch (connection.request.method ){
        case RequestMethod.Post:
          // get parameters from post request
          let params = JSON.parse(connection.request.getBody());

          // create user end point
          if(connection.request.url.endsWith('api/users/add')){

              // check user credentials and return fake jwt token if valid
              alert('test inside back end user/add');
              if (1==1) {
                connection.mockRespond(new Response(
                  new ResponseOptions({ status: 200, body: { token: 'fake-jwt-token' } })
                ));
              } else {
                connection.mockRespond(new Response(
                  new ResponseOptions({ status: 200 })
                ));
              }
          }
          // authenticate end point
          else if (connection.request.url.endsWith('api/authenticate/')) {
            alert('test inside back end api/authenticate');
            if (params.username=='beh') {
              connection.mockRespond(new Response(
                new ResponseOptions(
                  { status: 200,
                    body: {
                      id:1,
                      token: 'fake-jwt-token'
                    }})
              ));
            } else {
              connection.mockRespond(new Response(
                new ResponseOptions({ status: 403 })
              ));
            }


          }
          break;
        case RequestMethod.Get:
          break;
        default: alert('service was not caught by fake back end');
      }

    }, 500);

  });

  return new Http(backend, options);
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: Http,
  useFactory: fakeBackendFactory,
  deps: [MockBackend, BaseRequestOptions]
};
