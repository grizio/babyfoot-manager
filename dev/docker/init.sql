create table event_store
(
    id    bigserial primary key,
    store varchar(15) not null,
    event jsonb
);

create index idx_event_store_store on event_store (store);