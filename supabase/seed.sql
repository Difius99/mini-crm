update public.profiles p set role = 'manager',  full_name = 'Анна Руководитель'
  from auth.users u where u.id = p.id and u.email = 'manager@example.com';
update public.profiles p set role = 'executor', full_name = 'Иван Исполнитель'
  from auth.users u where u.id = p.id and u.email = 'executor1@example.com';
update public.profiles p set role = 'executor', full_name = 'Пётр Исполнитель'
  from auth.users u where u.id = p.id and u.email = 'executor2@example.com';

do $$
declare
  m  uuid := (select id from auth.users where email = 'manager@example.com');
  e1 uuid := (select id from auth.users where email = 'executor1@example.com');
  e2 uuid := (select id from auth.users where email = 'executor2@example.com');
  o1 uuid; o2 uuid; o3 uuid; t uuid;
begin
  if m is null or e1 is null or e2 is null then
    raise exception 'Сначала создайте трёх пользователей в Authentication → Users';
  end if;

  insert into public.objects (name, address) values ('ЖК «Северный»', 'г. Томск, ул. Северная, 12') returning id into o1;
  insert into public.objects (name, address) values ('Склад «Восток»', 'г. Томск, Иркутский тракт, 45') returning id into o2;
  insert into public.objects (name, address) values ('Офис на Ленина', 'г. Томск, пр. Ленина, 80') returning id into o3;

  insert into public.tasks (title, description, object_id, assignee_id, author_id)
  values ('Принять арматуру', 'Проверить сертификаты и количество по накладной', o1, e1, m);

  insert into public.tasks (title, description, object_id, assignee_id, author_id)
  values ('Залить фундамент секции Б', 'Бетон М300, после заливки укрыть плёнкой', o1, e1, m) returning id into t;
  update public.tasks set status = 'in_progress' where id = t;
  insert into public.task_history (task_id, from_status, to_status, changed_by) values (t, 'new', 'in_progress', e1);

  insert into public.tasks (title, description, object_id, assignee_id, author_id)
  values ('Смонтировать опалубку 3 этажа', 'По проекту КЖ-3', o1, e2, m) returning id into t;
  update public.tasks set status = 'review' where id = t;
  insert into public.task_history (task_id, from_status, to_status, changed_by) values
    (t, 'new', 'in_progress', e2),
    (t, 'in_progress', 'review', e2);

  insert into public.tasks (title, description, object_id, assignee_id, author_id)
  values ('Утеплить кровлю', 'Минвата 150 мм, пароизоляция', o2, e2, m) returning id into t;
  update public.tasks set status = 'rework' where id = t;
  insert into public.task_history (task_id, from_status, to_status, changed_by, comment) values
    (t, 'new', 'in_progress', e2, null),
    (t, 'in_progress', 'review', e2, null),
    (t, 'review', 'rework', m, 'Не проклеены стыки пароизоляции, переделать');

  insert into public.tasks (title, description, object_id, assignee_id, author_id)
  values ('Установить ворота склада', 'Секционные ворота 4×4 м', o2, e1, m) returning id into t;
  update public.tasks set status = 'accepted' where id = t;
  insert into public.task_history (task_id, from_status, to_status, changed_by) values
    (t, 'new', 'in_progress', e1),
    (t, 'in_progress', 'review', e1),
    (t, 'review', 'accepted', m);

  insert into public.tasks (title, description, object_id, assignee_id, author_id)
  values ('Демонтаж перегородок', 'Кабинеты 3 и 4, вывоз мусора', o3, e2, m);
end $$;
