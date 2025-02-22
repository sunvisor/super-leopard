/**
 * CreatePage
 *
 * Created by sunvisor on 2023/12/12.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Page } from "./Page";
import { PageData } from '../../data';


export function createPage(data: PageData): Page {
  return new Page(data);
}
